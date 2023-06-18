import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import QualitiesList from "../../ui/qualities/qualitiesList"
import { useHistory } from "react-router-dom"

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()
  const history = useHistory()
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])
  const handleClick = () => {
    history.push(`/users/${userId}/edit`)
  }
  if (user) {
    return (
      <div className="text-center">
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <QualitiesList qualities={user.qualities} />
        <div>Рейтинг: {user.rate}</div>
        <button className="btn btn-primary mt-2" onClick={handleClick}>
          Изменить
        </button>
      </div>
    )
  } else {
    return <p>loading...</p>
  }
}
UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
}
export default UserPage
