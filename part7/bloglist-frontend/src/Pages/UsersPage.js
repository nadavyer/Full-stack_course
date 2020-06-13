import React from 'react'
import Notification from '../components/Notification'
import UserTable from '../components/UserTable'
import Navigator from '../components/Navigator'


const UsersPage = ({ user, users, handleLogout }) => {

  return (
    <div>
      <Navigator user={user} handleLogout={handleLogout}/>
      <h2>Users</h2>

      <Notification/>

      <UserTable usersBlogsCount={users}/>
    </div>
  )
}

export default UsersPage