import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/useAuthStore'
import SmoothScroll from './components/SmoothScroll'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import { useEffect } from 'react'
import { ToastContainer } from './components/Toast.jsx'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore()
  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return <Navigate to="/login" />
  return children
}

function App() {
  const { fetchUser, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser()
    }
  }, [isAuthenticated, fetchUser])

  return (
    <Router>
      <SmoothScroll>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </SmoothScroll>
      <ToastContainer />
    </Router>
  )
}

export default App
