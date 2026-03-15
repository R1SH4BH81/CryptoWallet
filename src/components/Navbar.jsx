import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'
import '../styles/Navbar.css'

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore()
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    setIsMobileMenuActive(false)
    navigate('/login')
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownActive(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuActive(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuActive(false)
  }, [location.pathname])

  return (
    <nav className={`main-navbar ${isMobileMenuActive ? 'mobile-active' : ''} ${location.pathname !== '/' ? 'navbar-solid' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="nav-logo">
            <div className="logo-image-wrapper">
              <img src="/static/favicon.png" alt="CoinCloud Logo" className="navbar-logo-img" />
            </div>
          </Link>
          {isAuthenticated && (
            <div className="nav-links desktop-only">
              <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
              <Link to="/market" className={`nav-link ${location.pathname === '/market' ? 'active' : ''}`}>Market</Link>
              <Link to="/trending" className={`nav-link ${location.pathname === '/trending' ? 'active' : ''}`}>Trending</Link>
              <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}>Search</Link>
            </div>
          )}
        </div>

        {/* <div className="nav-center">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/solutions" className="nav-link">Solutions</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
        </div> */}
        
        <div className={`nav-right ${isMobileMenuActive ? 'active' : ''}`} ref={mobileMenuRef}>
          {isAuthenticated && (
            <div className="nav-links mobile-only">
              <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
              <Link to="/market" className={`nav-link ${location.pathname === '/market' ? 'active' : ''}`}>Market</Link>
              <Link to="/trending" className={`nav-link ${location.pathname === '/trending' ? 'active' : ''}`}>Trending</Link>
              <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}>Search</Link>
              <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
              <button onClick={handleLogout} className="nav-link logout-btn-mobile">Logout</button>
            </div>
          )}
          {isAuthenticated ? (
            <div className="nav-user-area desktop-only">
             
              <div 
                className={`nav-profile-dropdown ${isDropdownActive ? 'active' : ''}`}
                ref={dropdownRef}
                onClick={() => setIsDropdownActive(!isDropdownActive)}
              >
                <div className="profile-trigger">
                   <div className="profile-img">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="user-text">
                    <span className="username">{user?.username}</span>
                    <span className="user-email">{user?.email}</span>
                  </div>
                 
                </div>
                
                {isDropdownActive && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      <i className="fas fa-user"></i>
                      <span>Profile</span>
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="nav-auth-links">
              <Link to="/login" className="nav-link-login">Login</Link>
              <Link to="/signup">
                <button className="nav-btn-signup">
                  Sign up
                  <span className="nav-btn-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="14px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                  </span>
                </button>
              </Link>
            </div>
          )}
        </div>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuActive ? 'active' : ''}`}
          onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
