import useAuthStore from '../../store/useAuthStore'

const TransactionHistory = ({ isTransactionView, onToggleView, showOnlyToggle, showOnlyList }) => {
  const { wallets } = useAuthStore()
  
  // Get all transactions from all wallets
  const transactions = wallets?.flatMap(wallet => wallet.transactions) || []
  
  if (showOnlyToggle) {
    return (
      <div className="view-all-transactions-wrapper">
        <div 
          className="view-all-transactions" 
          onClick={onToggleView}
        >
          {isTransactionView ? 'Go Back' : 'View All Transactions'}
        </div>
      </div>
    )
  }

  if (showOnlyList || isTransactionView) {
    return (
      <div 
        className="show-transaction-list" 
        style={{ display: 'block', width: '100%' }}
      >
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <div key={tx.id || index} className={tx.type === 'sent' ? 'sent' : 'receive'}>
              <div className={tx.type === 'sent' ? 'sent-icon' : 'receive-icon'}>
                <img 
                  id={tx.type === 'sent' ? 'sent-symbol' : 'receive-symbol'} 
                  src={tx.type === 'sent' ? '/static/sent.png' : '/static/receive.png'} 
                  alt={tx.type} 
                />
              </div>
              <div className="info-block">
                <div className={tx.type === 'sent' ? 'sent-address' : 'receive-address'}>
                  <span id={tx.type === 'sent' ? 'sent-add' : 'receive-add'}>
                    {tx.address ? `${tx.address.substring(0, 10)}...` : 'Unknown Address'}
                  </span>
                </div>
                <div className={tx.type === 'sent' ? 'sent-date' : 'receive-date'}>
                  <span id="val">{tx.type === 'sent' ? 'Sent' : 'Received'}</span> | <span id="date-val">{tx.date}</span>
                </div>
              </div>
              <div className="amount-block">
                <span id={tx.type === 'sent' ? 'sent-amt' : 'receive-amt'}>{tx.amount.toFixed(8)}</span>
                <span id={tx.type === 'sent' ? 'sent-coin' : 'receive-coin'}>{tx.coin}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-transactions">
            <p>No transaction found</p>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default TransactionHistory
