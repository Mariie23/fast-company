import React from "react"
import PropTypes from "prop-types"
import CommentsItem from "./commentsItem"

const CommentsList = ({ comments, onRemove }) => {
  return (
    <div className="card mb-3 mt-4">
      <div className="card-body ">
        <h2>Comments</h2>
        <hr />
        {comments.map((comment) => (
          <CommentsItem key={comment._id} {...comment} onRemove={onRemove} />
        ))}
      </div>
    </div>
  )
}
CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default CommentsList
