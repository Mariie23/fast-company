import React, { useState } from "react"
import PropTypes from "prop-types"

const TextField = ({ name, type, value, label, onChange, error }) => {
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "")
  }
  const getIconClass = () => {
    return "bi bi-eye" + (showPassword ? "-slash" : "")
  }
  const togglePassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          type={showPassword ? "text" : type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={togglePassword}
          >
            <i className={getIconClass()}></i>
          </button>
        )}

        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}
TextField.defaultPropd = {
  type: "text",
}
TextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextField
