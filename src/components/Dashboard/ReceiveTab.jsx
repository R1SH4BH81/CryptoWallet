import React from 'react';
import { Copy, ChevronDown } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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
      <ChevronDown size={14} className={isDropdownOpen ? 'rotated' : ''} />
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

const ReceiveTab = ({ 
  selectedCoin, 
  setSelectedCoin, 
  walletAddress, 
  handleCopy,
  coins,
  isDropdownOpen,
  setIsDropdownOpen
}) => {
  return (
    <div className="receive-view">
      <div className="swap-section">
        <div className="section-label">Select Asset to Receive</div>
        <div className="input-row">
          <div style={{ fontSize: '20px', fontWeight: '600' }}>{selectedCoin}</div>
          <CoinSelector 
            current={selectedCoin} 
            onChange={setSelectedCoin} 
            coins={coins}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </div>
        
      </div>

      <div className="receive-card">
           <div className="address-display-box">
          {/* <div className="address-label">Your {selectedCoin} Address</div>
          <div className="address-value">{walletAddress || 'Generating...'}</div> */}
          <button className="copy-btn" onClick={handleCopy}>
            <Copy size={16} />
            Copy Address
          </button>
        </div>
        <div className="qr-placeholder" style={{ padding: '20px', background: 'white', borderRadius: '20px' }}>
          {walletAddress ? (
            <QRCodeSVG 
              value={walletAddress} 
              size={140}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: selectedCoin === 'BTC' ? 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' : 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          ) : (
            <div className="qr-inner">Generating...</div>
          )}
        </div>
     
      </div>
    </div>
  );
};

export default ReceiveTab;
