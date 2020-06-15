import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    props.handleLogin(username, password)
    setUsername('')
    setPassword('')
  }


  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <div >
            <br/>
            <Button variant="secondary" type="submit">
              login
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm