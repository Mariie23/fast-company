import React from "react"
import PropTypes from "prop-types"
const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number > 4 && number < 15) return "человек готовы"
    const lastOne = Number(number.toString().slice(-1))
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека готовы"
    if (lastOne === 1) return "человек готов"
  }
  return (
    <h2>
      <span className={"badge bg-" + (length ? "primary" : "danger")}>
        {length
          ? `${length} ${renderPhrase(length)} к встрече`
          : "Все заняты:("}
      </span>
    </h2>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
}

export default SearchStatus
