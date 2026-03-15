import React from 'react';
import { Plus, Gift } from 'lucide-react';

const TotalBalanceCard = ({ totalUsdValue, onDepositClick, onViewRewardsClick }) => {
  return (
    <div className="total-balance-card">
      <div className="balance-info">
        <span className="balance-label">Total Balance</span>
        <div className="balance-amount">${totalUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="balance-earnings">$0 Total Earnings</div>
      </div>
      <div className="balance-actions">
        <button className="balance-btn" onClick={onDepositClick}>
          <Plus size={18} />
          Deposit Funds
        </button>
        <button className="balance-btn" onClick={onViewRewardsClick}>
          <Gift size={18} />
          View Rewards
        </button>
      </div>
    </div>
  );
};

export default TotalBalanceCard;
