from flask import Flask, render_template, request, redirect, url_for, session, abort, jsonify
import firebase_admin
from firebase_admin import credentials, auth, db
import requests
import json
from google_auth_oauthlib.flow import Flow
import secrets
import string
from bitcoinlib.wallets import Wallet , WalletError
from bitcoinlib.mnemonic import Mnemonic
from bitcoinlib.services.bitcoind import BitcoindClient
# Firebase Web API Key
FIREBASE_WEB_API_KEY = ''
# Configure the RPC connection to Bitcoin Core
rpc_user = 'capybara'
rpc_password = 'capybara@123'
rpc_host = '127.0.0.1'
rpc_port = 8332

# Create a base URL for the RPC connection
base_url = f'http://{rpc_user}:{rpc_password}@{rpc_host}:{rpc_port}'

# Initialize BitcoindClient with the base URL
bdc = BitcoindClient(base_url=base_url)

# Initialize the Flask application
app = Flask(__name__)
app.secret_key = 'your_secret_key'


# Initialize Firebase Admin SDK
cred = credentials.Certificate("./coincloud-serviceAccount-Key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': ''
})




# Define the landing page route
@app.route('/')
def Landing_page():
    return render_template('landing2.html')

# Helper function to check if user is logged in
def is_logged_in():
    return 'user' in session

# Register route
@app.route('/register', methods=['GET', 'POST'])
def register():
    #wallet adress generator
    def generate_random_name(length=8):
        return ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(length))

    # Create a wallet on the Bitcoin mainnet with a random name
    passphrase = Mnemonic().generate()
    wallet_name = generate_random_name()
    wallet = Wallet.create(wallet_name, keys=passphrase, network='bitcoin')
    account_btc2 = wallet.new_account('Account BTC ')
    account_ltc1 = wallet.new_account('Account LTC', network='litecoin')
    private_master_key_wif_account1 = wallet.account(0).key().wif_private()
    private_master_key_wif_account2 = wallet.account(1).key().wif_private()

        # Get the first key (address) from the wallet
    key_btc2 = wallet.get_key(account_btc2.account_id).address
    key_ltc1 = wallet.get_key(account_ltc1.account_id).address
    
    if request.method == 'POST':
        # Get form data
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        agree_terms = request.form.get('agree-btn')

        if not agree_terms:
            return 'You must agree to the terms!'

        payload = json.dumps({
            "email": email,
            "password": password,
            "returnSecureToken": True
        })

        # Send request to Firebase to create a new user
        r = requests.post(f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_WEB_API_KEY}", data=payload)
        result = r.json()
        

        if 'idToken' in result:
            # Generate BTC and ETH addresses
    
            ref = db.reference('users')
            user_ref = ref.child(result['localId'])
            user_ref.set({
                'name': username,
                'email': email,
                'Wallet_Name': wallet_name,
                'Wallet_AddressBTC':key_btc2,
                'Wallet_AddressLTC':key_ltc1,
                'passphrase':passphrase,
                'private_master_key_wif_BTC':private_master_key_wif_account1,
                'private_master_key_wif_LTC':private_master_key_wif_account2
            })
            return redirect('/login')
        else:
            error_message = result.get("error", {}).get("message", "Registration failed for unknown reasons.")
            return f'Registration failed: {error_message}'
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get form data
        email = request.form.get('email')
        password = request.form.get('password')

        payload = json.dumps({
            "email": email,
            "password": password,
            "returnSecureToken": True
        })

        # Send request to Firebase to authenticate the user
        r = requests.post(f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_WEB_API_KEY}", data=payload)
        result = r.json()
        

        if 'idToken' in result:
            # Retrieve user information from the database
            ref = db.reference('users')
            user_ref = ref.child(result['localId'])
            user_info = user_ref.get()

            if user_info:
                # Store user information in the session
                session['user'] = user_info
                return redirect('/home')
            else:
                return 'Login failed: User data not found.'
        else:
            error_message = result.get("error", {}).get("message", "Authentication failed for unknown reasons.")
            return f'Login failed: {error_message}'
    return render_template('signin.html')



@app.route('/home')
def home():
    if not is_logged_in():
        abort(404)
    
    user = session['user']  # Fetch user data from session
    wallet_name = user.get('Wallet_Name')
    
    try:
        # Access the wallet using the wallet name from the session
        wallet = Wallet(wallet_name)
        
        # Manually update the balance if needed, based on the library's methods
        # wallet.getbalance() or wallet.utxos_update() could be used based on what is available
        balance = wallet.balance()  # Remove update=True
        balance_bitcoins = balance / 100000000  # Convert to BTC
        
        # Add balance to the user info
        user['balance'] = balance_bitcoins
    
    except WalletError as e:
        # Handle the case where the wallet is not found or there's an error
        user['balance'] = 'Error: Wallet not found'
        print(f"WalletError: {e}")
    
    # Construct user_info dictionary with necessary data
    user_info = {
        'name': user.get('name', ''),
        'email': user.get('email', ''),
        'Wallet_Name': user.get('Wallet_Name', ''),
        'Wallet_AddressBTC': user.get('Wallet_AddressBTC', ''),
        'Wallet_AddressLTC': user.get('Wallet_AddressLTC', ''),
        'passphrase': user.get('passphrase', ''),
        'balance': user.get('balance', '0')
    }
    
    # Check if it's an AJAX request
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Return JSON response with user info and balance
        return jsonify(user_info)
    else:
        # Render the Dashboard.html template with user data
        return render_template('Dashboard.html', user=user)

# Define a custom error handler for 404 errors
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Run the Flask application
if __name__ == "__main__":
    app.run(debug=True)
