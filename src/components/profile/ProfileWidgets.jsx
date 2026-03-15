import React from 'react'
import { Plus, MoreHorizontal, Wallet, ShieldCheck, TrendingUp, TrendingDown, MapPin, Home, GraduationCap, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const ProfileWidgets = () => {
  return (
    <div className="profile-widgets">
      {/* Smart Wallet Section */}
      <div className="smart-wallet-card">
        <div className="card-header">
          <div className="header-info">
            <h2>Smart Wallet</h2>
            <p>Effortless saving goals.</p>
          </div>
          <button className="add-new-btn">
            Add New <Plus size={16} />
          </button>
        </div>
        
        <div className="balance-section">
          <div className="main-balance">
            19,820.00 <span className="currency">USD</span>
          </div>
          <div className="balance-label">Total Saving</div>
        </div>

        <div className="category-icons">
          <div className="category-item">
            <div className="category-icon-wrapper">
              <MapPin size={20} />
            </div>
            <span>Travel</span>
          </div>
          <div className="category-item">
            <div className="category-icon-wrapper">
              <Home size={20} />
            </div>
            <span>Property</span>
          </div>
          <div className="category-item">
            <div className="category-icon-wrapper">
              <GraduationCap size={20} />
            </div>
            <span>Education</span>
          </div>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="summary-grid">
        <SummaryCard 
          icon={<Wallet size={20} />} 
          title="Current Balance" 
          amount="$7,000.75" 
          change="+34.5%" 
          isPositive={true} 
        />
        <SummaryCard 
          icon={<ShieldCheck size={20} />} 
          title="Savings" 
          amount="$5,300.50" 
          change="+12.01%" 
          isPositive={true} 
        />
        <SummaryCard 
          icon={<TrendingUp size={20} />} 
          title="Income" 
          amount="$28,750.75" 
          change="+7.76%" 
          isPositive={true} 
        />
        <SummaryCard 
          icon={<TrendingDown size={20} />} 
          title="Expenses" 
          amount="$21,450.00" 
          change="-8.12%" 
          isPositive={false} 
        />
      </div>
    </div>
  )
}

const SummaryCard = ({ icon, title, amount, change, isPositive }) => (
  <div className="summary-card">
    <div className="summary-card-header">
      <div className="summary-icon-wrapper">
        {icon}
      </div>
      <span className="summary-title">{title}</span>
      <button className="options-btn">
        <MoreHorizontal size={16} />
      </button>
    </div>
    <div className="summary-card-body">
      <div className="summary-amount">{amount}</div>
      <div className={`summary-change ${isPositive ? 'positive' : 'negative'}`}>
        {change} {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      </div>
    </div>
  </div>
)

export default ProfileWidgets
