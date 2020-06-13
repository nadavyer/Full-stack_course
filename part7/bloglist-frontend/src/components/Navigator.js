import React from 'react'
import { Link } from 'react-router-dom'

const Navigator = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <p>
      <Link style={padding} to='/'> blogs  </Link>
      <Link style={padding} to='/users'> users </Link>
      {user.name} logged in
      <button style={padding} onClick={handleLogout}>logout</button>
    </p>
  )
}

export default Navigator