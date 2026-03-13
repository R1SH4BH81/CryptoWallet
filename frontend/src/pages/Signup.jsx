import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import useToastStore from '../store/useToastStore'
import Loader from '../components/Loader'
import FormField from '../components/auth/FormField'
import '../styles/SignupForm.css'
import '../styles/loader.css'
import '../styles/AuthForms.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { register, loading: authLoading } = useAuthStore()
  const { addToast } = useToastStore()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agree) {
      addToast('Error', 'error', 'Please agree to terms and conditions')
      return
    }
    const success = await register(username, email, password)
    if (success) {
      addToast('Registration successful', 'success', 'Please sign in to continue')
      navigate('/login')
    } else {
      const error = useAuthStore.getState().error
      addToast('Registration failed', 'error', error)
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <div id="content" className="signup-page" style={{ display: isLoading ? 'none' : 'block' }}>
        <div className="auth-container">
          <form className="form" onSubmit={handleSubmit}>
            <h1 className="form-title">Sign Up</h1>
            
            <FormField 
              label="Username"
              placeholder="Enter your Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#151717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            />

            <FormField 
              label="Email"
              placeholder="Enter your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                  <g data-name="Layer 3" id="Layer_3">
                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                  </g>
                </svg>
              )}
            />

            <FormField 
              label="Password"
              placeholder="Create Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                  <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                  <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                </svg>
              )}
            />

            <div className="flex-row">
              <input 
                type="checkbox" 
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label>I agree to the <span className="span">Terms & Conditions</span></label>
            </div>

            <button className="button-submit" type="submit" disabled={authLoading}>
              {authLoading ? 'Loading...' : 'Sign Up'}
            </button>

            <p className="p">Already have an account? <Link to="/login"><span className="span">Sign In</span></Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
