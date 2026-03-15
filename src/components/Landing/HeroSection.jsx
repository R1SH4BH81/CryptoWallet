import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">
        Elevate your <br />
        <span className="gradient-text">crypto experience</span>
      </h1>
      
      <p className="hero-description">
        Experience the future of digital finance. Our platform offers top-tier security and a seamless user experience for all your crypto needs.
      </p>
      
      <div className="hero-actions">
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <button className="btn-primary">
            Get Started
            <span className="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="14px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HeroSection
