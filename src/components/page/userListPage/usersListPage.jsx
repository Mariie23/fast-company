import React, { useState, useEffect } from "react"
import UsersTable from "../../ui/usersTable"
import Pagination from "../../common/pagination"
import { paginate } from "../../../utils/paginate"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import api from "../../../api"
import _ from "lodash"
import TextField from "../../common/form/textField"

const UsersListPage = () => {
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [users, setUsers] = useState()
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])
  const handleUserDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id))
  }
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, search])
  const handleChangePage = (page) => setCurrentPage(page)
  const handleProfessionSelect = (prof) => {
    setSearch("")
    setSelectedProf(prof)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  const handleChange = (target) => {
    setSelectedProf()
    setSearch(target.value)
  }
  if (users) {
    const filteredUsers = search
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf),
        )
      : users
    const usersCount = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
    const usersCrop = paginate(currentPage, pageSize, sortedUsers)
    const clearFilter = () => setSelectedProf()
    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column flex-grow-1">
          <SearchStatus length={usersCount} />
          <TextField value={search} onChange={handleChange} />
          {usersCount > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleUserDelete}
            />
          )}{" "}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={usersCount}
              pageSize={pageSize}
              onChangePage={handleChangePage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    )
  }
  return "loading..."
}

export default UsersListPage
