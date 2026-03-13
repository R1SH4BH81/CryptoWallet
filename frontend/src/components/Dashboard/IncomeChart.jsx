const IncomeChart = ({ transactions = [] }) => {
  // Extract and group income (deposits/receives) by month
  const incomeData = transactions
    .filter(tx => tx.type === 'receive')
    .reduce((acc, tx) => {
      const date = new Date(tx.date)
      const month = date.toLocaleString('default', { month: 'short' })
      acc[month] = (acc[month] || 0) + (tx.amount * 65000) // Convert to USD for chart
      return acc
    }, {})

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // Sort and filter for months that have data or are relevant
  const currentMonth = new Date().getMonth()
  const displayMonths = months.slice(Math.max(0, currentMonth - 2), currentMonth + 1)
  
  const values = displayMonths.map(m => incomeData[m] || 0)
  const maxVal = Math.max(...values, 1000)
  
  // Create path points for SVG
  const width = 400
  const height = 180
  const points = values.map((val, i) => {
    const x = (i / (displayMonths.length - 1)) * width
    const y = height - (val / maxVal) * height
    return `${x} ${y}`
  }).join(' L ')

  const fillPath = `M 0 ${height} L ${points} V ${height} H 0 Z`

  return (
    <div className="income-section">
      <div className="section-header">
        <h3>Income History</h3>
        <div className="timeframes">
          <span>1 year</span>
          <span>6m</span>
          <span className="active">3m</span>
          <span>1m</span>
          <span>7d</span>
          <span>1d</span>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-y-axis">
          <span>{(maxVal / 1000).toFixed(0)}k</span>
          <span>{(maxVal / 2000).toFixed(1)}k</span>
          <span>0</span>
        </div>
        <div className="chart-main">
          <svg viewBox={`0 0 ${width} ${height + 20}`} className="income-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f06543" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f06543" stopOpacity="0" />
              </linearGradient>
            </defs>
            {displayMonths.length > 1 ? (
              <>
                <path
                  d={`M ${points}`}
                  fill="none"
                  stroke="#f06543"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={fillPath}
                  fill="url(#gradient)"
                />
              </>
            ) : (
              <text x="200" y="90" fill="#808080" textAnchor="middle">No historical data available</text>
            )}
          </svg>
          <div className="chart-x-axis">
            {displayMonths.map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeChart
