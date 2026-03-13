import { useEffect, useState, useCallback } from 'react'
import useAuthStore from '../store/useAuthStore'
import Loader from '../components/Loader'
import useTradingView from '../hooks/useTradingView'
import useLenis from '../hooks/useLenis'
import MyCards from '../components/Dashboard/MyCards'
import BalanceWidget from '../components/Dashboard/BalanceWidget'
import IncomeChart from '../components/Dashboard/IncomeChart'
import AssetWidget from '../components/Dashboard/AssetWidget'
import TransactionTable from '../components/Dashboard/TransactionTable'

import SendReceiveForm from '../components/Dashboard/SendReceiveForm'
import { Landmark, CreditCard as CardIcon, X } from 'lucide-react'
import '../styles/dashboard.css'
import '../styles/loader.css'

const Dashboard = () => {
  const { user, wallets, fetchUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [showSendReceive, setShowSendReceive] = useState(false)
  const [isSendMode, setIsSendMode] = useState(true)
  const [selectedCoin, setSelectedCoin] = useState('BTC')
  const [amount, setAmount] = useState('')

  useTradingView()
  useLenis(!isLoading && !showSendReceive)

  useEffect(() => {
    const loadData = async () => {
      await fetchUser()
      setIsLoading(false)
    }
    loadData()
  }, [fetchUser])

  const currentWallet = wallets?.[0] || {}
  const btcBalance = currentWallet.balance_btc || 0
  const ltcBalance = currentWallet.balance_ltc || 0
  
  // Real stats calculation
  const btcPrice = 65000 // Mock price, could be fetched from an API
  const ltcPrice = 85 // Mock price
  const totalUsdValue = (btcBalance * btcPrice) + (ltcBalance * ltcPrice)
  
  const transactions = currentWallet.transactions || []

  const handleNewTransfer = () => {
    setIsSendMode(true)
    setShowSendReceive(true)
  }

  const handleRewards = () => {
    alert('Rewards: You have 150 points available! Redeem them for reduced transaction fees.')
  }

  const handleReferral = () => {
    const referralCode = user?.username?.toUpperCase() || 'USER123'
    alert(`Your Referral Code: ${referralCode}\nShare this with friends to earn 5% of their transaction fees!`)
  }

  const handleHistory = () => {
    const tableElement = document.querySelector('.transaction-table-section')
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const copyToClipboard = useCallback((text) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    alert('Address copied to clipboard!')
  }, [])

  return (
    <div className="dashboard-page">
      {isLoading && <Loader />}

      <div className="dashboard-container" style={{ display: isLoading ? 'none' : 'block' }}>
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.username || 'User'}! Track, manage, and spend your crypto easily.</p>
          </div>
          <button className="new-transfer-btn" onClick={handleNewTransfer}>New transfer</button>
        </header>

        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="left-column">
            <MyCards 
              balance={totalUsdValue} 
              onRewards={handleRewards}
              onReferral={handleReferral}
              onHistory={handleHistory}
            />
     
          </div>

          {/* Middle Column */}
          <div className="middle-column">
            <div className="middle-top-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <BalanceWidget 
                btcBalance={btcBalance} 
                ltcBalance={ltcBalance} 
                totalUsd={totalUsdValue} 
              />
              <IncomeChart transactions={transactions} />
            </div>
            <TransactionTable transactions={transactions} />
          </div>

          {/* Right Column */}
          <div className="right-column">
            <AssetWidget 
              title="My assets" 
              amount={`${btcBalance.toFixed(4)} BTC`} 
              subtext={`≈ ${(btcBalance * btcPrice).toLocaleString()} USD`} 
              icon={<Landmark size={20} />} 
              type="asset"
            />
            <div className="asset-divider" style={{ display: 'flex', justifyContent: 'center', margin: '-10px 0', zIndex: 2 }}>
              <div style={{ background: '#1a1a1a', padding: '5px', borderRadius: '50%' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 10L12 15L7 10" stroke="#f06543" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 14L12 9L17 14" stroke="#f06543" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <AssetWidget 
              title="Secondary asset" 
              amount={`${ltcBalance.toFixed(4)} LTC`} 
              subtext={`≈ ${(ltcBalance * ltcPrice).toLocaleString()} USD`} 
              icon={<CardIcon size={20} />} 
              type="card"
            />
          </div>
        </div>
      </div>

      {/* Send/Receive Modal Overlay */}
      {showSendReceive && (
        <div className="modal-overlay" onClick={() => setShowSendReceive(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowSendReceive(false)}>
              <X size={24} />
            </button>
            <SendReceiveForm 
              isSendMode={isSendMode}
              setIsSendMode={setIsSendMode}
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
              walletAddress={selectedCoin === 'BTC' ? currentWallet.address_btc : currentWallet.address_ltc}
              amount={amount}
              setAmount={setAmount}
              balance={selectedCoin === 'BTC' ? btcBalance : ltcBalance}
              copyToClipboard={copyToClipboard}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
