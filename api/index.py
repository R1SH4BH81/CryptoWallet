from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

# Set a local directory for bitcoinlib config/logs where we have write access
# On Vercel, the only writable directory is /tmp
import pathlib
bitcoinlib_dir = pathlib.Path("/tmp/.bitcoinlib_config")
bitcoinlib_dir.mkdir(parents=True, exist_ok=True)
os.environ['BCL_DATABASE_DIR'] = str(bitcoinlib_dir)
os.environ['HOME'] = "/tmp"
os.environ['USERPROFILE'] = "/tmp"

# Set bitcoinlib to use the same PostgreSQL database as the main application
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    os.environ['BCL_DATABASE_URL'] = DATABASE_URL

import models, schemas, auth, database, wallet_utils

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORS Middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    payload = auth.decode_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    username: str = payload.get("sub")
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    return user

@app.post("/register", response_model=schemas.UserResponse)
def register_user(user_create: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(
        (models.User.username == user_create.username) | (models.User.email == user_create.email)
    ).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    # Create new user
    hashed_password = auth.get_password_hash(user_create.password)
    new_user = models.User(
        username=user_create.username,
        email=user_create.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create a wallet for the user automatically
    wallet_data = wallet_utils.create_crypto_wallet()
    new_wallet = models.UserWallet(
        user_id=new_user.id,
        name=wallet_data["name"],
        address_btc=wallet_data["address_btc"],
        address_ltc=wallet_data["address_ltc"],
        passphrase=wallet_data["passphrase"],
        private_key_btc=wallet_data["private_key_btc"],
        private_key_ltc=wallet_data["private_key_ltc"]
    )
    db.add(new_wallet)
    db.commit()
    
    return new_user

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    # Try to find user by username or email
    user = db.query(models.User).filter(
        (models.User.username == form_data.username) | (models.User.email == form_data.username)
    ).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    refresh_token_expires = timedelta(days=auth.REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token = auth.create_refresh_token(
        data={"sub": user.username}, expires_delta=refresh_token_expires
    )
    
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

@app.get("/dashboard", response_model=schemas.DashboardResponse)
def get_dashboard_data(current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    wallets = db.query(models.UserWallet).filter(models.UserWallet.user_id == current_user.id).all()
    
    # Transform wallets and get balance
    wallet_responses = []
    for wallet in wallets:
        balance_btc = wallet_utils.get_wallet_balance(wallet.name)
        # Note: balance_ltc could be added similarly if wallet_utils supported it
        wallet_responses.append(schemas.WalletResponse(
            id=wallet.id,
            name=wallet.name,
            address_btc=wallet.address_btc,
            address_ltc=wallet.address_ltc,
            balance_btc=balance_btc,
            balance_ltc=0.0  # Placeholder for LTC balance
        ))
    
    user_response = schemas.UserResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        created_at=current_user.created_at
    )
    
    return schemas.DashboardResponse(user=user_response, wallets=wallet_responses)

# Endpoint to refresh access token
@app.post("/refresh", response_model=schemas.Token)
def refresh_token(refresh_token: str, db: Session = Depends(database.get_db)):
    payload = auth.decode_token(refresh_token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
    username: str = payload.get("sub")
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    access_token = auth.create_access_token(data={"sub": user.username})
    new_refresh_token = auth.create_refresh_token(data={"sub": user.username})
    
    return {"access_token": access_token, "refresh_token": new_refresh_token, "token_type": "bearer"}
