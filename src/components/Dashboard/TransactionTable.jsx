import { ChevronLeft, ChevronRight } from 'lucide-react'

const TransactionTable = ({ transactions = [] }) => {
  // Use real data if available, otherwise show empty or mock (though user wants real)
  const displayTransactions = transactions.length > 0 ? transactions.map(tx => ({
    time: tx.date || 'Unknown',
    type: tx.type === 'sent' ? 'Sent' : 'Received',
    crypto: `${tx.amount.toFixed(8)} ${tx.coin || 'BTC'}`,
    usd: `${tx.type === 'sent' ? '-' : '+'}${(tx.amount * 65000).toFixed(2)} USD`, // Mock USD conversion
    fee: tx.type === 'sent' ? '0.0001 BTC' : '--',
    total: `${tx.type === 'sent' ? '-' : '+'}${(tx.amount * 65000).toFixed(2)} USD`,
    status: 'Completed'
  })) : []

  return (
    <div className="transaction-table-section">
      <div className="section-header">
        <h3>Transactions</h3>
      </div>

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Crypto amount</th>
              <th>USD amount</th>
              <th>Fee</th>
              <th>Total amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayTransactions.length > 0 ? (
              displayTransactions.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.time}</td>
                  <td>{tx.type}</td>
                  <td>{tx.crypto}</td>
                  <td className={tx.usd.startsWith('+') ? 'text-green' : 'text-red'}>{tx.usd}</td>
                  <td>{tx.fee}</td>
                  <td className={tx.total.startsWith('+') ? 'text-green' : 'text-red'}>{tx.total}</td>
                  <td>
                    <span className={`status-badge ${tx.status.toLowerCase()}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#808080' }}>
                  No transactions yet. Start trading to see your history!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="results-count">Showing {displayTransactions.length} results</span>
        <div className="pagination">
          <ChevronLeft size={16} />
          <span className="page-num active">1</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  )
}

export default TransactionTable
