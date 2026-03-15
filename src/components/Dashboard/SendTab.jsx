

const CoinSelector = ({ current, onChange, coins, isDropdownOpen, setIsDropdownOpen }) => (
  <div className="sr-custom-dropdown">
    <div 
      className="sr-dropdown-selected" 
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <div className="coin-info">
        <div className={`coin-icon ${current.toLowerCase()}`}>{current[0]}</div>
        <span>{current}</span>
      </div>
     
    </div>
    {isDropdownOpen && (
      <div className="sr-dropdown-list">
        {coins.map(coin => (
          <div 
            key={coin} 
            className={`sr-dropdown-item ${current === coin ? 'active' : ''}`}
            onClick={() => {
              onChange(coin)
              setIsDropdownOpen(false)
            }}
          >
            {coin}
          </div>
        ))}
      </div>
    )}
  </div>
);

const SendTab = ({ 
  amount, 
  setAmount, 
  selectedCoin, 
  setSelectedCoin, 
  balance, 
  destinationAddress, 
  setDestinationAddress, 
  handleAction, 
  isSubmitting,
  coins,
  isDropdownOpen,
  setIsDropdownOpen
}) => {
  return (
    <div className="send-view">
      <div className="swap-section">
        <div className="section-label">Amount to Send</div>
        <div className="input-row">
          <input 
            type="number" 
            className="amount-input"
            placeholder="0.00"
            value={amount}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || parseFloat(val) >= 0) {
                setAmount(val);
              }
            }}
            min="0"
          />
          <CoinSelector 
            current={selectedCoin} 
            onChange={setSelectedCoin} 
            coins={coins}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </div>
        <div className="section-footer">
          <span className="balance-text">Available: {balance.toFixed(8)} {selectedCoin}</span>
          <button className="max-btn" onClick={() => setAmount(balance.toString())}>Max</button>
        </div>
      </div>

      <div className="swap-section" style={{ marginTop: '12px' }}>
        <div className="section-label">Recipient Address</div>
        <div className="input-row">
          <input 
            type="text" 
            className="address-input"
            placeholder="Enter destination address"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            style={{ fontSize: '16px' }}
          />
        </div>
      </div>

      <button 
        className="sr-main-btn" 
        onClick={handleAction}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Now'}
      </button>
    </div>
  );
};

export default SendTab;
