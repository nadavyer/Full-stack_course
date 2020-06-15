import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'

const Blog = ({ blog, handleLike, handleRemove, own }) => {

  return (
    <div className='blog'>
      <div>
        <h2>{blog.title} - {blog.author}</h2>
      </div>
      <div>
        <a href={`https://${blog.url}`}> {blog.url} </a>
      </div>
      <div>likes {blog.likes}
        {/*<button onClick={() => handleLike(blog.id)}>like</button>*/}
        <Button variant='secondary' size='sm' onClick={() => handleLike(blog.id)}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>
      {own && <Button variant='secondary' size='sm' onClick={() => handleRemove(blog.id)}>remove blog</Button>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog