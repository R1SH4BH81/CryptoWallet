import '../../styles/send-receive-form.css'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const SendReceiveForm = ({
  isSendMode,
  setIsSendMode,
  selectedCoin,
  setSelectedCoin,
  walletAddress,
  amount,
  setAmount,
  balance,
  copyToClipboard
}) => {
  const [destinationAddress, setDestinationAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSend = async () => {
    if (!destinationAddress || !amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid address and amount')
      return
    }

    if (parseFloat(amount) > balance) {
      alert('Insufficient balance')
      return
    }

    setIsSubmitting(true)
    // Simulate API call for sending crypto
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Successfully sent ${amount} ${selectedCoin} to ${destinationAddress}`)
      setAmount('')
      setDestinationAddress('')
    } catch (error) {
      alert('Failed to send transaction')
    } finally {
      setIsSubmitting(false)
    }
  }

  const coins = ['BTC', 'LTC']

  const CoinSelector = () => (
    <div className="sr-custom-dropdown">
      <div 
        className="sr-dropdown-selected" 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{selectedCoin}</span>
        <ChevronDown size={14} className={isDropdownOpen ? 'rotated' : ''} />
      </div>
      {isDropdownOpen && (
        <div className="sr-dropdown-list">
          {coins.map(coin => (
            <div 
              key={coin} 
              className={`sr-dropdown-item ${selectedCoin === coin ? 'active' : 'inactive'}`}
              onClick={() => {
                setSelectedCoin(coin)
                setIsDropdownOpen(false)
              }}
            >
              {coin}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="sr-container">
      <div className="sr-header">
        <h2 className="sr-title">{isSendMode ? 'Send' : 'Receive'}</h2>
        <div className="sr-tabs">
          <button 
            className={`sr-tab ${isSendMode ? 'active' : ''}`}
            onClick={() => setIsSendMode(true)}
          >
            Send
          </button>
          <button 
            className={`sr-tab ${!isSendMode ? 'active' : ''}`}
            onClick={() => setIsSendMode(false)}
          >
            Receive
          </button>
        </div>
      </div>

      <div className="sr-content">
        {isSendMode ? (
          <>
            <div className="sr-card sr-card-from">
              <div className="sr-card-header">
                <span className="sr-label">From</span>
                <CoinSelector />
              </div>
              <div className="sr-card-body">
                <input 
                  type="number" 
                  className="sr-amount-input"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.00000001"
                />
                <div className="sr-balance">
                  Available: {balance.toFixed(8)} {selectedCoin}
                </div>
              </div>
            </div>

            <div className="sr-divider">
              <div className="sr-arrow-down">↓</div>
            </div>

            <div className="sr-card sr-card-to">
              <div className="sr-card-header">
                <span className="sr-label">To</span>
              </div>
              <div className="sr-card-body">
                <input 
                  type="text" 
                  className="sr-address-input"
                  placeholder="Enter destination address"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="sr-submit-btn" 
              onClick={handleSend}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : `Send ${selectedCoin}`}
            </button>
          </>
        ) : (
          <>
            <div className="sr-card sr-card-from">
              <div className="sr-card-header">
                <span className="sr-label">Receive</span>
                <CoinSelector />
              </div>
            </div>

            <div className="sr-card sr-card-to sr-receive-address-card">
              <div className="sr-card-header">
                <span className="sr-label">Your {selectedCoin} Address</span>
              </div>
              <div className="sr-card-body">
                <div 
                  className="sr-address-display"
                  onClick={() => copyToClipboard(walletAddress)}
                >
                  {walletAddress || 'Generating address...'}
                  <span className="sr-copy-hint">Click to copy</span>
                </div>
              </div>
            </div>

            <button 
              className="sr-submit-btn"
              onClick={() => copyToClipboard(walletAddress)}
            >
              Copy Address
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default SendReceiveForm
