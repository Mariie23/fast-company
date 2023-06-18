import React from "react"
import PropTypes from "prop-types"
import Select from "react-select"

const MultiSelectField = ({ options, name, label, onChange, defaultValue }) => {
  const optionsArr = Object.keys(options).map((option) => ({
    value: options[option]._id,
    label: options[option].name,
  }))
  const handleChange = (value) => {
    onChange({ name, value })
  }
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        name={name}
        options={optionsArr}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
      />
    </div>
  )
}
MultiSelectField.propTypes = {
  options: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
}
export default MultiSelectField
