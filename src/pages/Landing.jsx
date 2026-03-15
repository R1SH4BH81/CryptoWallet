import { useState, useEffect, lazy, Suspense } from 'react'
import Loader from '../components/Loader'
import '../styles/landing.css'
import '../styles/loader.css'

// Code splitting by lazy loading sections
const HeroSection = lazy(() => import('../components/Landing/HeroSection'))
const CryptoShowcase = lazy(() => import('../components/Landing/CryptoShowcase'))

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
        <Suspense fallback={<Loader />}>
          <HeroSection />
          <CryptoShowcase />
        </Suspense>
      </div>
    </div>
  )
}

export default Landing
