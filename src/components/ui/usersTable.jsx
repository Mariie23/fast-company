import React from "react"
import PropTypes from "prop-types"
import Table from "../common/table"
import Qualities from "./qualities"
import { Link } from "react-router-dom"

const UsersTable = ({ users, onSort, selectedSort, onDelete, ...rest }) => {
  const columns = {
    name: {
      iter: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    professions: { iter: "profession.name", name: "Профессия" },
    completedMeetings: { iter: "completedMeetings", name: "Кол-во встреч" },
    rate: { iter: "rate", name: "Оценка" },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Удалить
        </button>
      ),
    },
  }
  return (
    <Table columns={columns} data={users} {...{ selectedSort, onSort }} />
    // <Table>
    //   <TableHeader columns={columns} {...{ selectedSort, onSort }} />
    //   <TableBody columns={columns} data={users} />
    // </Table>
  )
}
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UsersTable
