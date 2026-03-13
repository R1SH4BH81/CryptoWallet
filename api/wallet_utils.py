import secrets
import string
from bitcoinlib.wallets import Wallet as BtcWallet, WalletError
from bitcoinlib.mnemonic import Mnemonic

def generate_random_name(length=8):
    return ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(length))

def create_crypto_wallet():
    # Create a wallet on the Bitcoin mainnet with a random name
    passphrase = Mnemonic().generate()
    wallet_name = generate_random_name()
    
    try:
        # Create wallet and accounts
        wallet = BtcWallet.create(wallet_name, keys=passphrase, network='bitcoin')
        account_btc = wallet.new_account('Account BTC')
        account_ltc = wallet.new_account('Account LTC', network='litecoin')
        
        # Get WIF private keys
        private_key_btc = wallet.account(account_btc.account_id).key().wif_private()
        private_key_ltc = wallet.account(account_ltc.account_id).key().wif_private()
        
        # Get addresses
        address_btc = wallet.get_key(account_btc.account_id).address
        address_ltc = wallet.get_key(account_ltc.account_id).address
        
        return {
            "name": wallet_name,
            "address_btc": address_btc,
            "address_ltc": address_ltc,
            "passphrase": passphrase,
            "private_key_btc": private_key_btc,
            "private_key_ltc": private_key_ltc
        }
    except WalletError as e:
        print(f"Error creating wallet: {e}")
        raise e

def get_wallet_balance(wallet_name):
    try:
        wallet = BtcWallet(wallet_name)
        balance = wallet.balance()  # balance in satoshis
        balance_btc = balance / 100000000  # Convert to BTC
        return balance_btc
    except WalletError:
        return 0.0

def get_wallet_transactions(wallet_name):
    try:
        wallet = BtcWallet(wallet_name)
        transactions = wallet.transactions()
        
        tx_list = []
        for tx in transactions:
            # Determine if it's sent or received based on balance change
            # This is a simplified logic
            is_sent = tx.balance_change < 0
            
            tx_list.append({
                "id": tx.txid,
                "type": "sent" if is_sent else "receive",
                "address": tx.outputs[0].address if is_sent else tx.inputs[0].address,
                "amount": abs(tx.balance_change) / 100000000,
                "date": tx.date.strftime("%d %B, %Y") if tx.date else "Unknown",
                "coin": "BTC" # Default to BTC for now
            })
        return tx_list
    except WalletError:
        return []
