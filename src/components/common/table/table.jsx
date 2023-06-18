import React from "react"
import PropTypes from "prop-types"
import TableHeader from "./tableHeader"
import TableBody from "./tableBody"

const Table = ({ columns, selectedSort, onSort, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader columns={columns} {...{ selectedSort, onSort }} />
          <TableBody columns={columns} data={data} />
        </>
      )}
    </table>
  )
}
Table.propTypes = {
  columns: PropTypes.object,
  selectedSort: PropTypes.object,
  onSort: PropTypes.func,
  data: PropTypes.array,
  children: PropTypes.array,
}
export default Table
