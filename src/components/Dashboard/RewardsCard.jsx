import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';

const RewardsCard = ({ onViewRewardsClick }) => {
  return (
    <div className="rewards-card">
      <div className="rewards-header">
        <div className="rewards-icon-bg">
          <Gift size={32} color="white" />
        </div>
        <div className="rewards-title-group">
          <h2>CoinCloud Rewards</h2>
        </div>
      </div>
      <p className="rewards-desc">
        Third-party protocols carry independent risks. Always research before depositing.
      </p>
      <div className="rewards-tags">
        <span className="rewards-tag">Multiple Partners</span>
        <span className="rewards-tag">Competitive APYs</span>
        <span className="rewards-tag">Onchain</span>
      </div>
      <a href="#" className="view-rewards-link" onClick={(e) => { e.preventDefault(); onViewRewardsClick(); }}>
        View your Rewards
        <ArrowRight size={16} />
      </a>
    </div>
  );
};

export default RewardsCard;
