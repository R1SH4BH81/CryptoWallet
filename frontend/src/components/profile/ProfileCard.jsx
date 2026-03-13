const ProfileCard = ({ title, children }) => {
  return (
    <div className="profile-card">
      <h3>{title}</h3>
      <div className="info-list">
        {children}
      </div>
    </div>
  )
}

export default ProfileCard
