import { useState, useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'
import useToastStore from '../store/useToastStore'
import Loader from '../components/Loader'
import { User, Mail, Shield, Camera } from 'lucide-react'
import '../styles/Profile.css'

const Profile = () => {
  const { user, fetchUser } = useAuthStore()
  const { addToast } = useToastStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      await fetchUser()
      setIsLoading(false)
    }
    init()
  }, [fetchUser])

  if (isLoading) return <Loader />

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <img 
              src={user?.profileImage || "/static/image.png"} 
              alt="Profile" 
              className="profile-avatar"
              onError={(e) => e.target.src = 'https://avatar.vercel.sh/' + user?.username}
            />
            <button className="avatar-edit-btn">
              <Camera size={18} />
            </button>
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p className="profile-role">Web3 Explorer</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <h3>Personal Information</h3>
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <User size={20} />
                </div>
                <div className="info-content">
                  <label>Username</label>
                  <span>{user?.username}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-content">
                  <label>Email Address</label>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3>Account Security</h3>
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <Shield size={20} />
                </div>
                <div className="info-content">
                  <label>Two-Factor Authentication</label>
                  <span className="status-badge active">Enabled</span>
                </div>
              </div>
              <button 
                className="btn-outline"
                onClick={() => addToast('Coming Soon', 'success', 'Password reset feature is being implemented')}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
