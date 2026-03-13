import { useEffect, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import Loader from '../components/Loader'
import '../styles/dashboard.css'
import '../styles/loader.css'

const Dashboard = () => {
  const { user, wallets, fetchUser, logout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCoin, setSelectedCoin] = useState('--')
  const [amount, setAmount] = useState('')
  const [isSendMode, setIsSendMode] = useState(true)
  const [isTransactionView, setIsTransactionView] = useState(false)
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  useEffect(() => {
    fetchUser()
    const timer = setTimeout(() => setIsLoading(false), 1500)
    
    // Inject TradingView scripts
    const scripts = [
      { src: 'https://www.livecoinwatch.com/static/lcw-widget.js' },
      { src: 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js', id: 'tv-timeline' },
      { src: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js', id: 'tv-overview' },
      { src: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js', id: 'tv-market' }
    ]

    scripts.forEach(s => {
      const script = document.createElement('script')
      script.src = s.src
      script.async = true
      if (s.id === 'tv-timeline') {
        script.innerHTML = JSON.stringify({
          "feedMode": "all_symbols",
          "isTransparent": true,
          "displayMode": "regular",
          "width": "100%",
          "height": "100%",
          "colorTheme": "dark",
          "locale": "en"
        })
        document.getElementById('timeline-container')?.appendChild(script)
      } else if (s.id === 'tv-overview') {
        script.innerHTML = JSON.stringify({
          "symbols": [["BITSTAMP:BTCUSD|1D"], ["CME:ETH1!|1D"], ["CRYPTOCAP:USDT|1D"], ["CRYPTOCAP:DOGE|1D"], ["CRYPTOCAP:SHIB|1D"], ["BINANCE:IOTAUSDT|1D"], ["BINANCE:ETCUSDT|1D"], ["CRYPTOCAP:ADA|1D"], ["CRYPTOCAP:MATIC|1D"], ["BINANCE:JUPUSDT|1D"], ["CRYPTOCAP:SOL|1D"]],
          "chartOnly": false, "width": "100%", "height": "100%", "locale": "en", "colorTheme": "dark", "autosize": true, "showVolume": false, "showMA": false, "hideDateRanges": false, "hideMarketStatus": false, "hideSymbolLogo": false, "scalePosition": "right", "scaleMode": "Normal", "fontFamily": "Courier New, monospace", "fontSize": "10", "noTimeScale": false, "valuesTracking": "1", "changeMode": "price-and-percent", "chartType": "area", "maLineColor": "#2962FF", "maLineWidth": 1, "maLength": 9, "fontColor": "rgba(255, 255, 255, 1)", "gridLineColor": "rgba(42, 46, 57, 0.07)", "backgroundColor": "rgba(255, 255, 255, 0)", "widgetFontColor": "rgba(255, 255, 255, 1)", "lineWidth": 2, "lineType": 0, "dateRanges": ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"]
        })
        document.getElementById('overview-container')?.appendChild(script)
      } else if (s.id === 'tv-market') {
        script.innerHTML = JSON.stringify({
          "colorTheme": "dark", "dateRange": "12M", "showChart": false, "locale": "en", "width": "100%", "height": "100%", "largeChartUrl": "", "isTransparent": true, "showSymbolLogo": true, "showFloatingTooltip": false, "tabs": [{ "title": "Crypto", "symbols": [{ "s": "CRYPTOCAP:SOL" }, { "s": "BITSTAMP:BTCUSD" }, { "s": "CRYPTOCAP:MATIC" }, { "s": "CRYPTOCAP:USDT" }, { "s": "BINANCE:ETCUSDT" }] }]
        })
        document.getElementById('market-container')?.appendChild(script)
      } else {
        document.body.appendChild(script)
      }
    })

    return () => {
      clearTimeout(timer)
      scripts.forEach(s => {
        const script = document.querySelector(`script[src="${s.src}"]`)
        if (script) script.remove()
      })
    }
  }, [fetchUser])

  const currentWallet = wallets?.[0] || {}
  const balance = selectedCoin === 'BTC' ? currentWallet.balance_btc : (selectedCoin === 'LTC' ? currentWallet.balance_ltc : 0)
  const walletAddress = selectedCoin === 'BTC' ? currentWallet.address_btc : (selectedCoin === 'LTC' ? currentWallet.address_ltc : '')

  const copyToClipboard = (text) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="dashboard-page">
      {isLoading && <Loader />}

      <div id="content" style={{ display: isLoading ? 'none' : 'block' }}>
        <div className="main">
          <div className="wrapper">
            {/* Modular Navbar is now handled by Layout */}
          </div>

          <div
            className="livecoinwatch-widget-5"
            lcw-base="USD"
            lcw-color-tx="#ffffff"
            lcw-marquee-1="coins"
            lcw-marquee-2="movers"
            lcw-marquee-items="30"
          ></div>

          <div className="hero">
            <div className="left" id="timeline-container">
              {/* Timeline script injected here */}
            </div>
            <div className="center">
              <div className="chart" id="overview-container">
                {/* Symbol Overview script injected here */}
              </div>
            </div>
            <div className="rightall">
              <div className="right">
                <div className="send-receive">
                  <div className="send-receive-child"></div>
                  
                  <div 
                    className="send-wrapper" 
                    id="send-wrapper"
                    style={{ display: (isSendMode && !isTransactionView) ? 'flex' : 'none' }}
                  >
                    <span><button>Submit</button></span>
                  </div>

                  <div className="swipe-down" id="swipe">
                    <div className="sd2">
                      <span>Swipe-down</span> <img src="/static/Polygon 1.png" alt="polygon" />
                    </div>
                  </div>

                  <div 
                    className="view-all-transactions-wrapper" 
                    id="view-all-trx"
                    style={{ 
                      top: isTransactionView ? '-6rem' : (isSendMode ? '355px' : '115px'),
                      height: isTransactionView ? '100%' : (isSendMode ? '0rem' : '16rem')
                    }}
                  >
                    <div 
                      className="view-all-transactions" 
                      id="view-all"
                      onClick={() => setIsTransactionView(!isTransactionView)}
                    >
                      {isTransactionView ? 'Go Back' : 'View All Transactions'}
                    </div>

                    <div 
                      className="show-transaction" 
                      id="show-trx"
                      style={{ display: isTransactionView ? 'inline-block' : 'none' }}
                    >
                      <div className="sent">
                        <div className="sent-icon">
                          <img id="sent-symbol" src="/static/sent.png" alt="sent" />
                        </div>
                        <div className="info-block">
                          <div className="sent-address">
                            <span id="sent-add">0xr7gy3yr57jt0p</span>
                          </div>
                          <div className="sent-date">
                            <span id="val">Sent</span> | <span id="date-val">22 March, 2024</span>
                          </div>
                        </div>
                        <div className="amount-block">
                          <span id="sent-amt">44.87</span>
                          <span id="sent-coin">BTC</span>
                        </div>
                      </div>
                      <div className="receive">
                        <div className="receive-icon">
                          <img id="receive-symbol" src="/static/receive.png" alt="receive" />
                        </div>
                        <div className="info-block">
                          <div className="receive-address">
                            <span id="receive-add">0x3bgy3yrlrjt0p</span>
                          </div>
                          <div className="receive-date">
                            <span id="val">Receive</span> | <span id="date-val">29 March, 2024</span>
                          </div>
                        </div>
                        <div className="amount-block">
                          <span id="receive-amt">157.73</span>
                          <span id="receive-coin">BTC</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isTransactionView && (
                    <>
                      <div className="select-coin" id="select-display">
                        <select 
                          name="coins" 
                          id="coins" 
                          value={selectedCoin}
                          onChange={(e) => setSelectedCoin(e.target.value)}
                        >
                          <option value="--">Select coin --</option>
                          <option value="BTC">Bitcoin</option>
                          <option value="LTC">Litecoin</option>
                        </select>
                        <div className="select-coin1">Select coin</div>
                      </div>

                      <div className="destination-address" id="dest-display">
                        <input
                          className="select-coin-dropdown"
                          type="text"
                          id="dest-address-input"
                          value={walletAddress}
                          readOnly
                          onClick={() => copyToClipboard(walletAddress)}
                        />
                        <div className="select-coin1" id="dest-address-placeholder">
                          MY Address
                        </div>
                      </div>

                      {isSendMode && (
                        <div className="amount" id="amount">
                          <input 
                            className="select-coin-dropdown" 
                            type="text" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <div className="select-coin1">Amount</div>
                          <div className="availablebalance" id="availablebalance">
                            Available : <span id="avail-amt">{balance.toFixed(8)}</span>
                            <span id="avail-type">{selectedCoin !== '--' ? selectedCoin : '--'}</span>
                          </div>
                        </div>
                      )}

                      <div 
                        className="sendbtn" 
                        id="send-btn"
                        onClick={() => setIsSendMode(true)}
                        style={{ color: isSendMode ? 'white' : 'grey' }}
                      >
                        Send
                      </div>
                      <div 
                        className="receivebtn" 
                        id="rec-btn"
                        onClick={() => setIsSendMode(false)}
                        style={{ color: !isSendMode ? 'white' : 'grey' }}
                      >
                        Receive
                      </div>
                      <div className="send-receive-item" id="hr-display"></div>
                    </>
                  )}
                </div>
              </div>
              <div className="right-bottom" id="market-container">
                {/* Market Overview script injected here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
