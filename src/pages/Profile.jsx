import { useState, useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'
import useToastStore from '../store/useToastStore'
import Loader from '../components/Loader'
import { User, Mail, Shield } from 'lucide-react'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileCard from '../components/profile/ProfileCard'
import ProfileWidgets from '../components/profile/ProfileWidgets'
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
        <ProfileHeader 
          user={user} 
          onUpdatePassword={() => addToast('Coming Soon', 'success', 'Password reset feature is being implemented')}
        />

        <ProfileWidgets />
      </div>
    </div>
  )
}

export default Profile
