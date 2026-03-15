import { Link } from 'react-router-dom'

const CryptoShowcase = () => {
  const coins = [
    { name: 'Bitcoin', symbol: 'BTC', price: '₹6,622,852.71', change: '1.49%', up: true, icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', price: '₹194,152.44', change: '1.13%', up: true, icon: 'Ξ' },
    { name: 'Tether', symbol: 'USDT', price: '₹92.57', change: '0.01%', up: false, icon: '₮' },
    { name: 'BNB', symbol: 'BNB', price: '₹61,158.08', change: '1.12%', up: true, icon: 'B' },
  ]

  return (
    <div className="crypto-showcase">
      <div className="showcase-info">
        <h2 className="showcase-title">
          Explore crypto like Bitcoin, <br />
          Ethereum, and Dogecoin.
        </h2>
        <p className="showcase-description">
          Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
        </p>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <button className="btn-primary">
            See more assets
          </button>
        </Link>
      </div>

      <div className="showcase-card">
        <div className="coin-list">
          {coins.map((coin, index) => (
            <div key={index} className="coin-row">
              <div className="coin-name-cell">
                <div className={`coin-icon-wrapper ${coin.symbol.toLowerCase()}`}>
                  {coin.icon}
                </div>
                <span className="coin-name">{coin.name}</span>
              </div>
              <div className="coin-price-cell">
                <div className="coin-price">{coin.price}</div>
                <div className={`coin-change ${coin.up ? 'up' : 'down'}`}>
                  {coin.up ? '↗' : '↘'} {coin.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CryptoShowcase
