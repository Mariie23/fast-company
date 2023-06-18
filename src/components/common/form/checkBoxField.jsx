import React from "react"
import PropTypes from "prop-types"

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name, value: !value })
  }
  return (
    <div className="form-check mb-4">
      <input
        className={"form-check-input" + (error ? " is-invalid" : "")}
        type="checkbox"
        value={value}
        id={name}
        name={name}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      <div id="invalidCheck3Feedback" className="invalid-feedback">
        {error}
      </div>
    </div>
  )
}

CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  error: PropTypes.string,
}
export default CheckBoxField
