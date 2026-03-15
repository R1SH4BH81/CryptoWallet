import '../../styles/send-receive-form.css'
import { useState, useEffect, lazy, Suspense } from 'react'
import { History, Send, Download } from 'lucide-react'
import { getCryptoPrices } from '../../services/cryptoApi'
import useToastStore from '../../store/useToastStore'

// Lazy load tab components
const SendTab = lazy(() => import('./SendTab'))
const ReceiveTab = lazy(() => import('./ReceiveTab'))
const ActivityTab = lazy(() => import('./ActivityTab'))

const SendReceiveForm = ({
  selectedCoin,
  setSelectedCoin,
  walletAddress,
  amount,
  setAmount,
  balance,
  copyToClipboard,
  transactions = []
}) => {
  const [destinationAddress, setDestinationAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [prices, setPrices] = useState(null)
  const [activeTab, setActiveTab] = useState('send') // 'send', 'receive', 'transactions'
  const { addToast } = useToastStore()

  useEffect(() => {
    const fetchPrices = async () => {
      const data = await getCryptoPrices(['bitcoin', 'litecoin'])
      setPrices(data)
    }
    fetchPrices()
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleAction = async () => {
    if (activeTab === 'send') {
      if (!destinationAddress || !amount || parseFloat(amount) <= 0) {
        addToast('Invalid Input', 'error', 'Please enter a valid address and amount')
        return
      }
      if (parseFloat(amount) > balance) {
        addToast('Insufficient Balance', 'error', `You don't have enough ${selectedCoin}`)
        return
      }

      setIsSubmitting(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        addToast('Transfer Successful', 'success', `Sent ${amount} ${selectedCoin} to ${destinationAddress.substring(0, 8)}...`)
        setAmount('')
        setDestinationAddress('')
      } catch (error) {
        addToast('Transfer Failed', 'error', 'Please try again later')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleCopy = () => {
    copyToClipboard(walletAddress)
    addToast('Address Copied', 'success', 'Wallet address copied to clipboard')
  }

  const coins = ['BTC', 'LTC']

  const loadingFallback = <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading...</div>

  return (
    <div className="sr-container">
      <div className="sr-tabs-container">
        <button 
          className={`sr-tab-btn ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => setActiveTab('send')}
        >
          <Send size={14} />
          <span>Send</span>
        </button>
        <button 
          className={`sr-tab-btn ${activeTab === 'receive' ? 'active' : ''}`}
          onClick={() => setActiveTab('receive')}
        >
          <Download size={14} />
          <span>Receive</span>
        </button>
        <button 
          className={`sr-tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <History size={14} />
          <span>Activity</span>
        </button>
      </div>

      <div className="sr-content">
        <Suspense fallback={loadingFallback}>
          {activeTab === 'send' && (
            <SendTab 
              amount={amount}
              setAmount={setAmount}
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
              balance={balance}
              destinationAddress={destinationAddress}
              setDestinationAddress={setDestinationAddress}
              handleAction={handleAction}
              isSubmitting={isSubmitting}
              coins={coins}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          )}

          {activeTab === 'receive' && (
            <ReceiveTab 
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
              walletAddress={walletAddress}
              handleCopy={handleCopy}
              coins={coins}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          )}

          {activeTab === 'transactions' && (
            <ActivityTab 
              transactions={transactions}
              selectedCoin={selectedCoin}
            />
          )}
        </Suspense>
      </div>
    </div>
  )
}

export default SendReceiveForm
