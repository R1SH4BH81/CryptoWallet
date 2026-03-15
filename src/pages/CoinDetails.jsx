import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCoinDetails, getCoinHistory } from '../services/cryptoApi'
import Loader from '../components/Loader'
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'
import '../styles/dashboard.css'
import '../styles/extraPages.css'

const CoinDetails = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState(null)
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true)
      const coinData = await getCoinDetails(id)
      const historyData = await getCoinHistory(id, 30) // 30 days history
      
      if (coinData) {
        setCoin(coinData)
      } else {
        setCoin(null)
      }

      if (historyData && historyData.prices) {
        const formattedData = historyData.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: price,
        }))
        setHistory(formattedData)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [id])

  if (isLoading) return <Loader />

  if (!coin) {
    return (
      <div className="dashboard-page extra-page-container">
        <div className="dashboard-container" style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Coin Not Found</h2>
          <p style={{ opacity: 0.6, marginBottom: '30px' }}>
            We couldn't find the coin with ID: <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{id}</span>. 
            Please make sure the ID is correct or try searching for it.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link 
              to="/dashboard" 
              className="action-btn" 
              style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 25px', borderRadius: '10px', textDecoration: 'none', color: '#fff' }}
            >
              Back to Dashboard
            </Link>
            <Link 
              to="/search" 
              className="action-btn" 
              style={{ background: '#2563eb', padding: '12px 25px', borderRadius: '10px', textDecoration: 'none', color: '#fff' }}
            >
              Search Coins
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isPositive = coin.market_data?.price_change_percentage_24h >= 0

  return (
    <div className="dashboard-page extra-page-container">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={coin.image?.large} alt={coin.name} style={{ width: '64px', height: '64px' }} />
            <div>
              <h1>{coin.name} ({coin.symbol?.toUpperCase()})</h1>
              <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                ${coin.market_data?.current_price?.usd?.toLocaleString()}
                <span style={{ 
                  fontSize: '0.6em', 
                  marginLeft: '15px', 
                  color: isPositive ? '#10b981' : '#ef4444' 
                }}>
                  {isPositive ? '+' : ''}{coin.market_data?.price_change_percentage_24h?.toFixed(2)}% (24h)
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="left-column">
            <div className="balance-card">
              <h3>30-Day Price Trend</h3>
              <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
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
              </div>
            </div>

            <div className="balance-card" style={{ marginTop: '20px' }}>
              <h3>About {coin.name}</h3>
              <p 
                style={{ opacity: 0.8, lineHeight: '1.6', fontSize: '0.9em' }}
                dangerouslySetInnerHTML={{ __html: coin.description?.en }}
              ></p>
            </div>
          </div>

          <div className="right-column">
            <div className="balance-card">
              <h3>Market Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                  <span style={{ opacity: 0.6 }}>Market Cap</span>
                  <span>${coin.market_data?.market_cap?.usd?.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                  <span style={{ opacity: 0.6 }}>Fully Diluted Valuation</span>
                  <span>${coin.market_data?.fully_diluted_valuation?.usd?.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                  <span style={{ opacity: 0.6 }}>24h Trading Volume</span>
                  <span>${coin.market_data?.total_volume?.usd?.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                  <span style={{ opacity: 0.6 }}>Circulating Supply</span>
                  <span>{coin.market_data?.circulating_supply?.toLocaleString()} {coin.symbol?.toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.6 }}>Total Supply</span>
                  <span>{coin.market_data?.total_supply?.toLocaleString()} {coin.symbol?.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="balance-card" style={{ marginTop: '20px' }}>
              <h3>Community Links</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                {coin.links?.homepage?.[0] && (
                  <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', color: '#fff' }}>Website</a>
                )}
                {coin.links?.subreddit_url && (
                  <a href={coin.links.subreddit_url} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', color: '#fff' }}>Reddit</a>
                )}
                {coin.links?.twitter_screen_name && (
                  <a href={`https://twitter.com/${coin.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', color: '#fff' }}>Twitter</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinDetails
