import React from "react"
import PropTypes from "prop-types"

const TextAreaField = ({ value, name, placeholder, error, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <>
      <textarea
        className={"form-control" + (error ? " is-invalid" : "")}
        placeholder={placeholder}
        name={name}
        id="validationTextarea"
        value={value}
        onChange={handleChange}
      ></textarea>
      {error && <div className="invalid-feedback mb-3">{error}</div>}
    </>
  )
}

TextAreaField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextAreaField
