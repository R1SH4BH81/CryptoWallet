import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const AssetList = ({ marketData, onCoinClick }) => {
  return (
    <div className="asset-list">
      {marketData.map((coin, index) => {
        // Extract sparkline data
        const sparklineData = coin.sparkline_in_7d?.price || [];
        // Map to Recharts format (only last 24 points for 24h if it's hourly, 
        // but CoinGecko sparkline is usually last 7 days. 
        // For a 24h feel, we'll take the last segment or just show the trend)
        const chartData = sparklineData.slice(-24).map((price, i) => ({
          time: i,
          price: price
        }));

        const isPositive = coin.price_change_percentage_24h >= 0;

        return (
          <div 
            className="asset-item" 
            key={coin.id} 
            onClick={() => onCoinClick && onCoinClick(coin)}
            style={{ cursor: 'pointer' }}
          >
            <div className="asset-icon-wrapper" style={{ backgroundColor: index === 0 ? '#f7931a' : index === 1 ? '#627eea' : index === 2 ? '#26a17b' : '#f3ba2f' }}>
              <img src={coin.image} alt={coin.name} style={{ width: '20px', height: '20px' }} />
            </div>
            <div className="asset-details">
              <span className="asset-name">{coin.symbol.toUpperCase()}</span>
              <span className="asset-sub">{coin.name}</span>
            </div>
            
            <div className="asset-graph-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={`gradient-${coin.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <YAxis domain={['auto', 'auto']} hide />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={isPositive ? '#10b981' : '#ef4444'} 
                    fillOpacity={1} 
                    fill={`url(#gradient-${coin.id})`} 
                    strokeWidth={2}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="asset-balance">
              <span className="balance-usd">${coin.current_price.toLocaleString()}</span>
              <span className={`balance-change ${isPositive ? 'pos' : 'neg'}`}>
                {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssetList;
