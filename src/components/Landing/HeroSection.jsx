import { Link } from 'react-router-dom'

const HeroSection = () => {
  

  return (
    <div className="hero-section">
      {/* Background Elements */}
      <div className="hero-bg-elements">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
        <div className="bg-grid"></div>
        <div className="bg-dots"></div>
      </div>

      {/* Top Visual Section */}
      <div className="hero-visual-container">
        <div className="hero-main-visual">
          <div className="floating-elements">
            <span className="name-tag cameron">+6K</span>
            <span className="name-tag esther">+11K</span>
            <span className="name-tag john">+4k</span>
            
            {/* Avatars from image */}
            <div className="floating-avatar avatar-top-right circular">
              <img src="https://cryptologos.cc/thumbs/bitcoin.png?v=040" alt="BTC" />
              
            </div>
           
   
            
            
            {/* Decorative dots/bubbles */}
            <div className="visual-bubbles">
              <div className="bubble b1"></div>
              <div className="bubble b2"></div>
              <div className="bubble b3"></div>
              <div className="bubble b4"></div>
            </div>
          </div>
          
          <div className="visual-screen">
             <div className="screen-content">
                <div className="user-activity-card">
                   <div className="activity-avatar">
                      <img src="https://i.pravatar.cc/150?u=tim" alt="Tim" />
                   </div>
                   <div className="activity-info">
                      <div className="activity-user-row">
                        <span className="user-name">Tim earned</span>
                      </div>
                      <div className="amount-row">
                        <span className="amount">$21K on week.</span>
                        <div className="coin-mini">
                          <img src="https://cryptologos.cc/thumbs/hedera.png?v=040" alt="coin" />
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="visual-logos">
             <div className="logo-box crypto-com">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhdKgY4Qcp4T7sXBIj4BCiYKRtt2YgHSZzng&s" alt="Crypto.com" />
             </div>
               <div className="plus-badge">+</div>
             <div className="logo-box dwf-labs">
               <div className="dwf-content">
                 <span className="dwf-text">DWF</span>
                 <span className="dwf-subtext">LABS</span>
               </div>
             </div>
             <div className="logo-box binance-labs">
               <img src="https://public.bnbstatic.com/image/pgc/202303/905a8278df6c58fddca8689933805b23.jpg" alt="Binance Labs" />
             </div>
          </div>
        </div>
      </div>

      <h1 className="hero-title">
        <span>Elevate your</span>
        <span className="title-with-icons">
           <span className="title-token-icons">
              <div className="token-icon eth">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L11.8 2.6V15.3L12 15.5L18.2 11.8L12 2Z" fill="#8C8C8C"/>
                  <path d="M12 2L5.8 11.8L12 15.5V9.1V2Z" fill="#BDBDBD"/>
                  <path d="M12 16.5L11.9 16.6V21.8L12 22L18.2 13.2L12 16.5Z" fill="#8C8C8C"/>
                  <path d="M12 22V16.5L5.8 13.2L12 22Z" fill="#BDBDBD"/>
                  <path d="M12 15.5L18.2 11.8L12 9.1L5.8 11.8L12 15.5Z" fill="#707070"/>
                  <path d="M12 15.5V9.1L5.8 11.8L12 15.5Z" fill="#8C8C8C"/>
                </svg>
              </div>
              <div className="token-icon generic">
                <div className="inner-dot"></div>
              </div>
           </span>
          crypto journey
        </span>
      </h1>
      <p className="hero-description">Experience the future of digital finance. Top-tier security and a seamless user experience for all your crypto needs.

 </p>
    

    
      
      <div className="hero-actions">
       <button className="btn-primary">
            Get Started
            <span className="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="14px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </span>
          </button>
      </div>

    
    </div>
  )
}

export default HeroSection
