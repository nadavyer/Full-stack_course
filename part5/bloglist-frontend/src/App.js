import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

const showBlogs = () => {
  blogService.getAll().then(blogs =>
    setBlogs( blogs )
  )
}

const loginPage = () => {

}
  useEffect(showBlogs, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
    {user === null ?
    <LoginForm username={username} password={password}
     handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} />
    :
    <BlogList blogs={blogs} />
    }
    </div>
  )
}

export default App