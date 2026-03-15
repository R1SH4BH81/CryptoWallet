import React from 'react';
import { TrendingUp, ChevronDown, ArrowUpRight } from 'lucide-react';

const DeFiSection = ({ defiOpportunities, onDefiClick }) => {
  return (
    <div className="defi-section">
      <div className="defi-filters">
        <div className="filter-pills">
          <button className="filter-pill">syrupUSDC</button>
          <button className="filter-pill">syrupUSDT</button>
        </div>
        <div className="all-chains-dropdown">
          <TrendingUp size={14} />
          <span>All Chains</span>
          <ChevronDown size={14} />
        </div>
      </div>
      
      <div className="defi-grid">
        {defiOpportunities.map((op) => (
          <div className="defi-card" key={op.name} onClick={() => onDefiClick(op.name)}>
            <div className="defi-info">
              <div className="defi-logo" style={{ color: op.color }}>{op.logo}</div>
              <div>
                <div className="defi-name">{op.name}</div>
                <div className="defi-desc">{op.desc}</div>
              </div>
            </div>
            <ArrowUpRight size={18} className="defi-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeFiSection;
