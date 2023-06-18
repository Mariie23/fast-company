import React from "react"
import _ from "lodash"
import PropTypes from "prop-types"

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onChangePage } = props
  const pageCount = Math.ceil(itemsCount / pageSize)
  if (pageCount <= 1) return
  const pages = _.range(1, pageCount + 1)
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={"page_" + page}
            className={"page-item" + (currentPage === page ? " active" : "")}
          >
            <button className="page-link" onClick={() => onChangePage(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
}

export default Pagination
