from pydantic import BaseModel, EmailStr
from typing import Optional, List
import datetime

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class WalletResponse(BaseModel):
    id: int
    name: str
    address_btc: str
    address_ltc: str
    balance_btc: float = 0.0
    balance_ltc: float = 0.0
    transactions: List[dict] = [] # Added to hold real transaction data

    class Config:
        from_attributes = True

class DashboardResponse(BaseModel):
    user: UserResponse
    wallets: List[WalletResponse]
