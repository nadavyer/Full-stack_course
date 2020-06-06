import React from 'react'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'
import BlogList from '../components/BlogList'

const BlogsPage = ({ user, handleLogout, blogFormRef }) => {
  return (
    <div>
      <h2>Blogs</h2>

      <Notification/>

      <p>
        {user.name} logged in
        <br/>
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogList user={user}/>
    </div>
  )
}

export default BlogsPage