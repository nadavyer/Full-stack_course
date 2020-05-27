import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>{props.blogs.sort(byLikes).map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={props.handleLike}
        handleRemove={props.handleRemove}
        own={props.user.username===blog.user.username}
      />
    )}</div>
  )
}

export default BlogList