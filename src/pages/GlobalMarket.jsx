import { useEffect, useState } from 'react'
import { getGlobalData } from '../services/cryptoApi'
import Loader from '../components/Loader'
import '../styles/dashboard.css'
import '../styles/extraPages.css'

const GlobalMarket = () => {
  const [globalData, setGlobalData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGlobalData()
      if (data && data.data) {
        setGlobalData(data.data)
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
          <h1>Global Market Overview</h1>
        </header>

        <div className="dashboard-grid">
          <div className="left-column">
            <div className="balance-card">
              <h3>Total Market Cap</h3>
              <p className="balance-amount">
                ${globalData?.total_market_cap?.usd?.toLocaleString()}
              </p>
              <div className="card-footer">
                <span className={`change ${globalData?.market_cap_change_percentage_24h_usd >= 0 ? 'pos' : 'neg'}`}>
                  {globalData?.market_cap_change_percentage_24h_usd?.toFixed(2)}% (24h)
                </span>
              </div>
            </div>

            <div className="balance-card" style={{ marginTop: '20px' }}>
              <h3>Total 24h Volume</h3>
              <p className="balance-amount">
                ${globalData?.total_volume?.usd?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="right-column">
            <div className="balance-card">
              <h3>Market Dominance</h3>
              <div className="market-dominance-list">
                {globalData?.market_cap_percentage && Object.entries(globalData.market_cap_percentage).slice(0, 5).map(([coin, percent]) => (
                  <div key={coin} className="dominance-item">
                    <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{coin}</span>
                    <span>{percent.toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalMarket
