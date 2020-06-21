import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../services/users'
import { Form, Button } from 'react-bootstrap'
import { notifyWith } from '../reducers/notificationReducer'
import { Redirect } from 'react-router-dom'

const RegistrationForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [name, setfullname] = useState('')
  const [password, setPassword] = useState('')
  const [retypepassword, setretypePassword] = useState('')

  const handleRegistration = event => {
    event.preventDefault()
    if (password !== retypepassword) {
      dispatch(notifyWith('password is not match confirmation password', 'error'))
    } else {
      const userToRegister = {
        username: username,
        name: name,
        password: password
      }
      try {
        const newUser = create(userToRegister)
        console.log(newUser);
        newUser.then(newUser => newUser.username ?
          dispatch(notifyWith('Registration completed. You can login',))
          :
          dispatch(notifyWith('failed registration', 'error'))
        )

        return <Redirect to='/blogs'/>

      } catch (e) {
        dispatch(notifyWith('failed registration', 'error'))

      }

      setUsername('')
      setfullname('')
      setPassword('')
      setretypePassword('')
    }
  }


  return (
    <div>
      <Form onSubmit={handleRegistration}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>full name</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            value={name}
            onChange={({ target }) => setfullname(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Form.Label>retype password</Form.Label>
          <Form.Control
            type="password"
            value={retypepassword}
            onChange={({ target }) => setretypePassword(target.value)}
          />
          <div>
            <br/>
            <Button variant="secondary" type="submit">
              Sign up
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}


export default RegistrationForm