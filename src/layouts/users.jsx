import React from "react"
import { useParams } from "react-router-dom"
import UserPage from "../components/page/userPage"
import UsersListPage from "../components/page/userListPage"
import EditUserPage from "../components/page/editUserPage"

const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  if (userId) {
    return edit ? (
      <EditUserPage userId={userId} />
    ) : (
      <UserPage userId={userId} />
    )
  } else {
    return <UsersListPage />
  }
}

export default Users
