import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import UserCard from "../../ui/userCard"
import QualitiesCard from "../../ui/qualitiesCard"
import MeetingsCard from "../../ui/meetingsCard"
import Comments from "../../ui/comments"
import { Link } from "react-router-dom"

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])
  if (user) {
    return (
      <div className="container">
        <Link to={"/users"} className="nav-link mb-3">
          Назад
        </Link>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
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
