import { useEffect, useState } from 'react'
import { getTrendingCoins } from '../services/cryptoApi'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import '../styles/dashboard.css'
import '../styles/extraPages.css'

const Trending = () => {
  const [trending, setTrending] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrendingCoins()
      if (data && data.coins) {
        setTrending(data.coins)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className="dashboard-page extra-page-container">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Trending Coins</h1>
        </header>

        <div className="trending-grid-responsive">
          {trending.map((item) => (
            <Link 
              key={item.item.id} 
              to={`/coin/${item.item.id}`} 
              className="trending-card-glass"
            >
              <div className="card-top-row">
                <div className="coin-brand">
                  <div className="coin-img-box">
                    <img src={item.item.small} alt={item.item.name} />
                  </div>
                  <div className="coin-titles">
                    <span className="symbol-pair">{item.item.symbol.toUpperCase()}/USD</span>
                    <span className="coin-name">{item.item.name}</span>
                  </div>
                </div>
                <button className="more-btn" onClick={(e) => e.preventDefault()}>
                  <div className="dots-icon">
                    <span></span><span></span><span></span>
                  </div>
                </button>
              </div>

              <div className="card-price-section">
                <span className="price-label">Price</span>
                <div className="price-main">{item.item.data.price}</div>
              </div>

              <div className="card-footer-section">
                <div className={`trend-indicator ${item.item.data.price_change_percentage_24h.usd >= 0 ? 'pos' : 'neg'}`}>
                  <span className="trend-arrow">
                    {item.item.data.price_change_percentage_24h.usd >= 0 ? '↗' : '↘'}
                  </span>
                  <span>
                    {item.item.data.price_change_percentage_24h.usd >= 0 ? '+' : ''}
                    {item.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                  </span>
                </div>
                
                <div className="card-sparkline-wrapper">
                  <img 
                    src={`https://www.coingecko.com/coins/${item.item.coin_id}/sparkline.svg`} 
                    alt="trend" 
                    className="sparkline-svg"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trending
