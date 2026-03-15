import React from 'react';
import { Send, Download, History } from 'lucide-react';

const ActivityTab = ({ transactions, selectedCoin }) => {
  return (
    <div className="transactions-view">
      <div className="transactions-list">
        {transactions.length > 0 ? (
          transactions.map((tx, idx) => (
            <div className="tx-item" key={idx}>
              <div className="tx-icon">
                {tx.type === 'send' ? <Send size={14} /> : <Download size={14} />}
              </div>
              <div className="tx-details">
                <div className="tx-type">{tx.type === 'send' ? 'Sent' : 'Received'} {tx.coin || selectedCoin}</div>
                <div className="tx-date">{tx.date || 'Today'}</div>
              </div>
              <div className={`tx-amount ${tx.type === 'send' ? 'neg' : 'pos'}`}>
                {tx.type === 'send' ? '-' : '+'}{tx.amount}
              </div>
            </div>
          ))
        ) : (
          <div className="no-tx">
            <History size={48} color="rgba(255,255,255,0.1)" />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTab;
