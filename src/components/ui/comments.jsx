import React, { useEffect, useState } from "react"
import api from "../../api"
import { useParams } from "react-router-dom"
import CommentsList from "../common/comments/commentsList"
import NewCommentsForm from "../common/comments/newCommentsForm"

const Comments = () => {
  const [comments, setComments] = useState([])
  const { userId } = useParams()
  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
  }, [])
  const handleRemove = (id) => {
    api.comments
      .remove(id)
      .then((id) =>
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id),
        ),
      )
  }
  const handleSubmit = (data) => {
    api.comments
      .add(data)
      .then((data) => setComments((prevState) => [...prevState, data]))
  }
  return (
    <>
      <NewCommentsForm onSubmit={handleSubmit} />
      {comments.length > 0 && (
        <CommentsList comments={comments} onRemove={handleRemove} />
      )}
    </>
  )
}

export default Comments
