import { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import useAuthStore from '../store/useAuthStore'
import useToastStore from '../store/useToastStore'
import Loader from '../components/Loader'
import useLenis from '../hooks/useLenis'
import { getCoinMarketData } from '../services/cryptoApi'
import '../styles/dashboard.css'
import '../styles/loader.css'

// Lazy load components for code splitting
const SendReceiveForm = lazy(() => import('../components/Dashboard/SendReceiveForm'))
const TotalBalanceCard = lazy(() => import('../components/Dashboard/TotalBalanceCard'))
const AssetList = lazy(() => import('../components/Dashboard/AssetList'))
const DeFiSection = lazy(() => import('../components/Dashboard/DeFiSection'))
const RewardsCard = lazy(() => import('../components/Dashboard/RewardsCard'))
const CoinOverlay = lazy(() => import('../components/Dashboard/CoinOverlay'))

const Dashboard = () => {
  const { user, wallets, fetchUser } = useAuthStore()
  const { addToast } = useToastStore()
  const [isLoading, setIsLoading] = useState(true)
  const [showSendReceive, setShowSendReceive] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState('BTC')
  const [amount, setAmount] = useState('')
  const [marketData, setMarketData] = useState([])
  const [selectedCoinForOverlay, setSelectedCoinForOverlay] = useState(null)
  const [showCoinOverlay, setShowCoinOverlay] = useState(false)

  useLenis(!isLoading && !showCoinOverlay)

  useEffect(() => {
    const loadData = async () => {
      await fetchUser()
      const coins = await getCoinMarketData(['bitcoin', 'litecoin', 'ethereum', 'tether'])
      if (coins) setMarketData(coins)
      setIsLoading(false)
    }
    loadData()
  }, [fetchUser])

  const currentWallet = wallets?.[0] || {}
  const btcBalance = currentWallet.balance_btc || 0
  const ltcBalance = currentWallet.balance_ltc || 0
  
  // Real prices from market data
  const btcPrice = marketData.find(c => c.id === 'bitcoin')?.current_price || 65000
  const ltcPrice = marketData.find(c => c.id === 'litecoin')?.current_price || 85
  const totalUsdValue = (btcBalance * btcPrice) + (ltcBalance * ltcPrice)

  const transactions = currentWallet.transactions || []

  const copyToClipboard = useCallback((text) => {
    if (!text) return
    navigator.clipboard.writeText(text)
  }, [])

  const handleDefiClick = (name) => {
    addToast('Opportunity Selected', 'success', `Redirecting to ${name} protocol...`)
  }

  const handleViewRewards = () => {
    addToast('Rewards Center', 'success', 'You have 150 points available for redemption!')
  }

  const handleCoinClick = (coin) => {
    setSelectedCoinForOverlay(coin)
    setShowCoinOverlay(true)
  }

  const defiOpportunities = [
    { name: 'Aave', desc: 'Borrow', logo: 'A', color: '#B6509E' },
    { name: 'Midas', desc: 'Earn more', logo: 'M', color: '#2563eb' },
    { name: 'Kamino', desc: 'Borrow & Loop', logo: 'K', color: '#00ffa3' },
    { name: 'Jupiter', desc: 'Borrow & Loop', logo: 'J', color: '#19fb9b' },
    { name: 'Fluid', desc: 'Swap, Borrow & Loop', logo: 'F', color: '#3b82f6' },
    { name: 'Morpho', desc: 'Borrow', logo: 'M', color: '#ffffff' }
  ]

  const loadingFallback = <div className="component-loader">Loading...</div>

  return (
    <div className="dashboard-page">
      {isLoading && <Loader />}

      <div className="dashboard-container" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>

        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="left-column">
            <Suspense fallback={loadingFallback}>
              <TotalBalanceCard 
                totalUsdValue={totalUsdValue} 
                onDepositClick={() => setShowSendReceive(true)} 
                onViewRewardsClick={handleViewRewards} 
              />
            </Suspense>

            <Suspense fallback={loadingFallback}>
              <AssetList marketData={marketData} onCoinClick={handleCoinClick} />
            </Suspense>

            {/* <Suspense fallback={loadingFallback}>
              <DeFiSection 
                defiOpportunities={defiOpportunities} 
                onDefiClick={handleDefiClick} 
              />
            </Suspense> */}
          </div>

          {/* Right Column */}
          <div className="right-column">
            <Suspense fallback={loadingFallback}>
              <SendReceiveForm 
                selectedCoin={selectedCoin}
                setSelectedCoin={setSelectedCoin}
                walletAddress={selectedCoin === 'BTC' ? currentWallet.address_btc : currentWallet.address_ltc}
                amount={amount}
                setAmount={setAmount}
                balance={selectedCoin === 'BTC' ? btcBalance : ltcBalance}
                copyToClipboard={copyToClipboard}
                transactions={transactions}
              />
            </Suspense>

            {/* <Suspense fallback={loadingFallback}>
              <RewardsCard onViewRewardsClick={handleViewRewards} />
            </Suspense> */}
          </div>
        </div>
      </div>

      {/* Keep modal for specialized actions if needed, but main UI is now inline */}
      {showSendReceive && (
        <div className="modal-overlay" onClick={() => setShowSendReceive(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowSendReceive(false)}>
              Close
            </button>
            <Suspense fallback={<Loader />}>
              <SendReceiveForm 
                selectedCoin={selectedCoin}
                setSelectedCoin={setSelectedCoin}
                walletAddress={selectedCoin === 'BTC' ? currentWallet.address_btc : currentWallet.address_ltc}
                amount={amount}
                setAmount={setAmount}
                balance={selectedCoin === 'BTC' ? btcBalance : ltcBalance}
                copyToClipboard={copyToClipboard}
                transactions={transactions}
              />
            </Suspense>
          </div>
        </div>
      )}

      {showCoinOverlay && selectedCoinForOverlay && (
        <div className="modal-overlay" onClick={() => setShowCoinOverlay(false)}>
          <div onClick={e => e.stopPropagation()}>
            <Suspense fallback={<Loader />}>
              <CoinOverlay 
                coin={selectedCoinForOverlay} 
                onClose={() => setShowCoinOverlay(false)} 
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}


export default Dashboard
