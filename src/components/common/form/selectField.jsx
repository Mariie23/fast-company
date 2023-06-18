import React from "react"
import PropTypes from "prop-types"
const SelectField = ({ label, value, name, options, onChange, error }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((option) => ({
          name: options[option].name,
          id: options[option]._id,
        }))
      : options
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <select
        className={"form-select" + (error ? " is-invalid" : "")}
        id={name}
        value={value}
        onChange={handleChange}
        name={name}
      >
        <option disabled value="">
          Выберите...
        </option>
        {optionsArray.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default SelectField
