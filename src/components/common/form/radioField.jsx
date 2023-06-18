import React from "react"
import PropTypes from "prop-types"

const RadioField = ({ name, label, options, onChange, value }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <>
      <label className="form-label">{label}</label>
      {options.map((option) => (
        <div className="form-check" key={option.name}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.value}
            onChange={handleChange}
            value={option.value}
            checked={value === option.value}
          />
          <label className="form-check-label" htmlFor={option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </>
  )
}

RadioField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}

export default RadioField
