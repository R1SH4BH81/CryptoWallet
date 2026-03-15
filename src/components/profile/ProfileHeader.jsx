import { Camera, Mail, Shield, Key } from 'lucide-react'

const ProfileHeader = ({ user, onUpdatePassword }) => {
  return (
    <div className="profile-header">
      <div className="header-main">
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
          <div className="header-meta">
            <div className="meta-item">
              <Mail size={14} />
              <span>{user?.email}</span>
            </div>
            <div className="meta-item">
              <Shield size={14} />
              <span className="status-badge active">2FA Enabled</span>
            </div>
          </div>
        </div>
      </div>
      
     
    </div>
  )
}

export default ProfileHeader
