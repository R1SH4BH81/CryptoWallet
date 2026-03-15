import { CreditCard, Wallet, Users, History, Eye } from 'lucide-react'
import '../../styles/dashboard.css'

const MyCards = ({ balance, onRewards, onReferral, onHistory }) => {
  return (
    <div className="card-section">
      <div className="section-header">
        <h3>My cards</h3>
        <button className="manage-btn">Manage</button>
      </div>

      <div className="card-visual">
        <div className="card-chip">
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="30" rx="4" fill="white" fillOpacity="0.1" />
            <path d="M5 10H35" stroke="white" strokeOpacity="0.2" />
            <path d="M5 15H35" stroke="white" strokeOpacity="0.2" />
            <path d="M5 20H35" stroke="white" strokeOpacity="0.2" />
          </svg>
        </div>
        <div className="card-number">
          4532 **** **** 8892 <Eye size={16} />
        </div>
        <div className="card-info">
          <div className="info-item">
            <span className="label">VALID THRU</span>
            <span className="value">12/28</span>
          </div>
          <div className="info-item">
            <span className="label">CVV</span>
            <span className="value">***</span>
          </div>
        </div>
        <div className="card-brand">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
      </div>

      <div className="card-footer">
        <div className="balance-info">
          <span className="label">Total Balance</span>
          <span className="value">$ {balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</span>
        </div>
        <div className="currency-info">
          <span className="label">Currency</span>
          <span className="value">USD/US Dollar</span>
        </div>
      </div>

      {/* <button className="apply-card-btn">Apply for New Card</button>

      <div className="quick-actions">
        <div className="action-item" onClick={onRewards} style={{ cursor: 'pointer' }}>
          <div className="action-icon rewards">
            <Wallet size={20} />
          </div>
          <span>Rewards</span>
        </div>
        <div className="action-item" onClick={onReferral} style={{ cursor: 'pointer' }}>
          <div className="action-icon referral">
            <Users size={20} />
          </div>
          <span>Referral</span>
        </div>
        <div className="action-item" onClick={onHistory} style={{ cursor: 'pointer' }}>
          <div className="action-icon history">
            <History size={20} />
          </div>
          <span>History</span>
        </div>
      </div> */}
    </div>
  )
}

export default MyCards
