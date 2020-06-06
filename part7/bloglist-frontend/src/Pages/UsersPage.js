import React from 'react'
import Notification from '../components/Notification'
import UserTable from '../components/UserTable'

const UsersPage = ({ user, handleLogout, usersBlogsCount}) => {

  return (
    <div>
      <h2>Users</h2>

      <Notification/>

      <p>
        {user.name} logged in
        <br/>
        <button onClick={handleLogout}>logout</button>
      </p>

      <UserTable usersBlogsCount={usersBlogsCount}/>
    </div>
  )
}

export default UsersPage