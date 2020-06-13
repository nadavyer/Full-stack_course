import React, { useEffect, useState } from 'react'
import blogServices from '../services/blogs'
import { notifyWith } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const BlogsComment = ({ blog }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(blog.comments)
  const dispatch = useDispatch()

  const handleNewComment = (event) => {
    event.preventDefault()
    try {
      blogServices.addComment(blog.id, comment)
      setComments(comments.concat(comment))
      setComment('')
    } catch (e) {
      dispatch(notifyWith('error: could not add comment'))
    }
  }


  return (
    <div>
      <h4> Comments </h4>
      <form onSubmit={handleNewComment}>
        <div>
          <input
            id='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button id="submit"> add comment</button>
        </div>
      </form>
      <div>
        <ul>
          {comments.map((comment, i) =>
            <li key={`${comment}_${i}`}>
              {comment}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default BlogsComment