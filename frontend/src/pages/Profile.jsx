import { useState, useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'
import useToastStore from '../store/useToastStore'
import Loader from '../components/Loader'
import { User, Mail, Shield } from 'lucide-react'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileCard from '../components/profile/ProfileCard'
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
        <ProfileHeader user={user} />

        <div className="profile-grid">
          <ProfileCard title="Personal Information">
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
          </ProfileCard>

          <ProfileCard title="Account Security">
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
          </ProfileCard>
        </div>
      </div>
    </div>
  )
}

export default Profile
