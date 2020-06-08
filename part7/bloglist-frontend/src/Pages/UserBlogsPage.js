import React from 'react'
import Notification from '../components/Notification'
import { useParams } from 'react-router-dom'


const UsersBlogsPage = ({ user, users, handleLogout }) => {
  const id = useParams().id
  const userToShow = users.find(user => String(user.id) === String(id))
  return (
    <div>
      <h2>Blogs</h2>

      <Notification/>

      <p>
        {user.name} logged in
        <br/>
        <button onClick={handleLogout}>logout</button>
      </p>

      <h4> Added blogs </h4>
      <ul>
        {userToShow ? userToShow.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )
          :
          null}
      </ul>
    </div>
  )
}

export default UsersBlogsPage