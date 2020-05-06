import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, updateBlog, deleteBlog }) => {

  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default BlogList