const FormField = ({ label, placeholder, type, value, onChange, icon }) => {
  return (
    <>
      <div className="flex-column">
        <label>{label}</label>
      </div>
      <div className="inputForm">
        {icon}
        <input 
          placeholder={placeholder}
          className="input" 
          type={type}
          required 
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default FormField
