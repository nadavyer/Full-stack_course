import React from 'react'

const LoginForm = ({ username, password, handleLoginButton, handleUsernameChange, handlePasswordChange }) => {

    return (
        <form onSubmit={handleLoginButton}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
}

export default LoginForm