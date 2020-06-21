import React from 'react'
import Notification from '../components/Notification'
import RegistrationForm from '../components/RegistrationForm'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Register = () => {

  return (
    <div>
      <h2>Register to application</h2>
      <Notification/>
      <RegistrationForm />
      <Link to='/'>
        <Button variant="secondary">
          Login
        </Button>
      </Link>
    </div>
  )
}

export default Register