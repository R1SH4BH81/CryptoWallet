import React from 'react';

const AssetList = ({ marketData }) => {
  return (
    <div className="asset-list">
      {marketData.map((coin, index) => (
        <div className="asset-item" key={coin.id}>
          <div className="asset-icon-wrapper" style={{ backgroundColor: index === 0 ? '#f7931a' : index === 1 ? '#627eea' : index === 2 ? '#26a17b' : '#f3ba2f' }}>
            <img src={coin.image} alt={coin.name} style={{ width: '20px', height: '20px' }} />
          </div>
          <div className="asset-details">
            <span className="asset-name">{coin.symbol.toUpperCase()}</span>
            <span className="asset-sub">O syrupUSDC</span>
          </div>
          <div className="asset-date">Date: 06/02/2026</div>
          <div className="asset-balance">
            <span className="balance-usd">Balance: ${coin.current_price.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetList;
