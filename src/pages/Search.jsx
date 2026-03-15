import { useEffect, useState, useCallback } from 'react'
import { getSearchSuggestions } from '../services/cryptoApi'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import '../styles/dashboard.css'
import '../styles/extraPages.css'

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = useCallback(async (searchQuery) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }
    setIsLoading(true)
    const data = await getSearchSuggestions(searchQuery)
    if (data && data.coins) {
      setResults(data.coins)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query)
    }, 500) // Debounce search

    return () => clearTimeout(timer)
  }, [query, handleSearch])

  return (
    <div className="dashboard-page extra-page-container">
      <div className="dashboard-container centered">
        <header className="dashboard-header search-header-centered">
          <h1>Universal Search</h1>
          <p>Search across 10,000+ cryptocurrencies</p>
        </header>

        <div className="search-centered-wrapper">
          <div className="glass-card search-main-card">
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search for a coin (e.g. Bitcoin, Solana)..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input-field"
              />
            </div>
            
            <div className="search-results-list">
              {isLoading ? (
                <div className="search-status-msg">Searching...</div>
              ) : results.length > 0 ? (
                <div className="results-grid">
                  {results.slice(0, 10).map((coin) => (
                    <Link 
                      key={coin.id} 
                      to={`/coin/${coin.id}`} 
                      className="search-result-row"
                    >
                      <div className="coin-meta">
                        <img src={coin.large} alt={coin.name} className="coin-icon-small" />
                        <div className="coin-names">
                          <span className="coin-name-bold">{coin.name}</span>
                          <span className="coin-symbol-dim">{coin.symbol.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="coin-rank">#{coin.market_cap_rank || 'N/A'}</div>
                    </Link>
                  ))}
                </div>
              ) : query.length >= 2 ? (
                <div className="search-status-msg">No coins found for "{query}"</div>
              ) : (
                <div className="search-status-msg">Type at least 2 characters to search...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
