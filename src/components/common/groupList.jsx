import React from "react"
import PropTypes from "prop-types"

const GroupList = ({ items, onItemSelect, selectedItem }) => {
  const itemsArr = Array.isArray(items) ? items : Object.values(items)
  return (
    <ul className="list-group">
      {itemsArr.map((item) => (
        <li
          key={item._id}
          className={
            "list-group-item" + (selectedItem === item ? " active" : "")
          }
          role="button"
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
}
export default GroupList
