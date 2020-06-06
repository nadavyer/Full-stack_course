import React from 'react'
import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'

const LoginPage = ({ handleLogin }) => {

  return (
    <div>
      <h2>login to application</h2>
      <Notification/>
      <LoginForm handleLogin={handleLogin}/>
    </div>
  )
}

export default LoginPage