import React from 'react'
import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const LoginPage = ({ handleLogin }) => {

  return (
    <div>
      <h2>Login to application</h2>
      <Notification/>
      <LoginForm handleLogin={handleLogin}/>
      <Link to='/register'>
        <Button variant="secondary">
          Register
        </Button>
      </Link>
    </div>
  )
}

export default LoginPage