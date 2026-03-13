import { TrendingUp, TrendingDown } from 'lucide-react'

const BalanceWidget = ({ btcBalance = 0, ltcBalance = 0, totalUsd = 0 }) => {
  const assets = [
    { name: 'USD', value: `$ ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: '2.5%', up: true, icon: '🇺🇸' },
    { name: 'BTC', value: btcBalance.toFixed(6), change: '1.2%', up: true, icon: '₿' },
    { name: 'LTC', value: ltcBalance.toFixed(6), change: '0.8%', up: false, icon: 'Ł' }
  ]

  return (
    <div className="balance-section">
      <div className="section-header">
        <h3>Current balance</h3>
        <div className="timeframes">
          <span className="active">1 year</span>
          <span>6m</span>
          <span>3m</span>
          <span>1m</span>
          <span>7d</span>
          <span>1d</span>
        </div>
      </div>

      <div className="asset-list">
        {assets.map((asset, index) => (
          <div key={index} className="asset-item">
            <div className="asset-main">
              <span className="asset-icon">{asset.icon}</span>
              <span className="asset-name">{asset.name}</span>
              <span className="asset-value">{asset.value}</span>
            </div>
            <div className={`asset-change ${asset.up ? 'up' : 'down'}`}>
              {asset.change}
              {asset.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BalanceWidget
