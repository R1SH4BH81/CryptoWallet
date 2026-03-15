import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { getCoinHistory } from '../../services/cryptoApi';
import { X } from 'lucide-react';
import '../../styles/coinOverlay.css';

const timeframes = [
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: '1Y', days: 365 },
  { label: '5Y', days: 1825 },
];

const CoinOverlay = ({ coin, onClose }) => {
  const [history, setHistory] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[2]); // Default 1Y
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const data = await getCoinHistory(coin.id, selectedTimeframe.days);
      if (data && data.prices) {
        const formattedData = data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: price,
        }));
        setHistory(formattedData);
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, [coin.id, selectedTimeframe]);

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="coin-overlay-container">
      <button className="close-overlay-btn-top" onClick={onClose}>
        <X size={24} />
      </button>

      <div className="coin-overlay-top-section">
        <div className="coin-info-main">
          <img src={coin.image} alt={coin.name} className="coin-logo-large" />
          <div className="coin-title-group">
            <h2>{coin.name} <span>({coin.symbol.toUpperCase()})</span></h2>
            <div className="coin-price-large">
              ${coin.current_price.toLocaleString()}
              <span className={`price-change-pill ${isPositive ? 'pos' : 'neg'}`}>
                {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="timeframe-selector">
          {timeframes.map((tf) => (
            <button
              key={tf.label}
              className={`timeframe-btn ${selectedTimeframe.label === tf.label ? 'active' : ''}`}
              onClick={() => setSelectedTimeframe(tf)}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="coin-overlay-content-row">
        <div className="chart-container-large">
          {isLoading ? (
            <div className="chart-loader">Loading historical data...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke={isPositive ? '#10b981' : '#ef4444'} 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="coin-stats-box">
          <div className="stat-item">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">${coin.market_cap.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h Volume</span>
            <span className="stat-value">${coin.total_volume.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Circulating Supply</span>
            <span className="stat-value">{coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">All Time High</span>
            <span className="stat-value">${coin.ath.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinOverlay;
