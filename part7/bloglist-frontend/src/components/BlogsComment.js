import React, { useState } from 'react'
import blogServices from '../services/blogs'
import { notifyWith } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'


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
      <Form onSubmit={handleNewComment}>
        <Form.Group>
          <Form.Control
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button variant="secondary" size='sm' type="submit">
            add comment
          </Button>
        </Form.Group>
      </Form>
      <h4> Comments </h4>
      {comments.length !== 0
        ? (<ul>
          {comments.map((comment, i) =>
            <li key={`${comment}_${i}`}>
              {comment}
            </li>
          )}
        </ul>)
        : <p>
            No comments yet.
        </p>}

    </div>
    // </div>
  )
}

export default BlogsComment