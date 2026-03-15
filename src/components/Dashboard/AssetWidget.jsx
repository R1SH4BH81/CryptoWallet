import { ArrowUpRight } from 'lucide-react'

const AssetWidget = ({ title, amount, subtext, icon, type }) => {
  return (
    <div className={`asset-widget-card ${type}`} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div className="asset-widget-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="asset-widget-title">
          <span className="label" style={{ color: '#808080', fontSize: '12px' }}>{title}</span>
        </div>
        <div className="icon-wrapper" style={{ 
          width: '32px', 
          height: '32px', 
          background: type === 'asset' ? 'rgba(39, 174, 96, 0.1)' : 'rgba(240, 101, 67, 0.1)', 
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: type === 'asset' ? '#27ae60' : '#f06543'
        }}>
          {icon}
        </div>
      </div>
      <div className="asset-widget-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div className="asset-widget-amount" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="main-amount" style={{ fontSize: '20px', fontWeight: '500' }}>{amount}</span>
          <span className="sub-amount" style={{ color: '#808080', fontSize: '12px' }}>≈ {subtext}</span>
        </div>
        <div className="asset-badge" style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          background: 'rgba(255, 255, 255, 0.05)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          color: '#f06543' 
        }}>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  )
}

export default AssetWidget
