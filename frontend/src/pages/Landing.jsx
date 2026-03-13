import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import '../styles/landing.css'
import '../styles/loader.css'

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="landing-page">
      {isLoading && <Loader />}

      <div 
        className="landing-content" 
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <div className="hero-section">
          <div className="hero-left">
            <div className="announcement-badge">
              <span className="badge-new">New</span>
              <span className="badge-text">Introducing our new most advanced Web3 hosting</span>
            </div>
            
            <h1 className="hero-title">
              Build on <br />
              <span className="gradient-text">decentralized <br /> crypto protocol</span>
            </h1>
            
            <p className="hero-description">
              Nebula Core is a leading provider of cutting-edge decentralized solutions, 
              powering the next generation of NFT, GameFi, and Metaverse projects.
            </p>
            
            <div className="hero-actions">
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">
                  Get Started
                  <span className="btn-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="hero-visual-placeholder">
              {/* This space is reserved for a static image or other visual content */}
              <div className="visual-glow"></div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
