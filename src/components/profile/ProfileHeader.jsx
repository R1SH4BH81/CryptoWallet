import { Camera } from 'lucide-react'

const ProfileHeader = ({ user }) => {
  return (
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
  )
}

export default ProfileHeader
