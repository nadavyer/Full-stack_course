import React from 'react'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'
import BlogList from '../components/BlogList'
import Navigator from '../components/Navigator'

const BlogsPage = ({ user, handleLogout, blogFormRef }) => {
  return (
    <div>
      <div>
        <Navigator user={user} handleLogout={handleLogout}/>
      </div>
      <h2>Blogs</h2>

      <Notification/>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogList user={user}/>
    </div>
  )
}

export default BlogsPage