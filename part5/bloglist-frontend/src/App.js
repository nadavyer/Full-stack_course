import React, { useState, useEffect } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedUser from './components/LoggedUser'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const loggedInUserToLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  
  useEffect(getBlogs, [])
  useEffect(loggedInUserToLocalStorage, [])

  const showNotification = (blog) => {//text = updated or deleted or added
    setNotification(
      `a new blog ${blog.title} by ${blog.author}`
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(
      message
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }  

  const handleLoginButton = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showErrorMessage(error.response.data.error)
    }
  }

  const handleLogoutButton = () => {
      window.localStorage.removeItem('loggedNoteappUser')
      setUser(null)
      setUsername('')
      setPassword('')
  }

  const handleCreateBlogButton = async (event) => {
    event.preventDefault()
    const blog = {
      title: title, 
      author: author,
      url: url
    }
    try {
      const addedBlog = await blogService.create(blog)
      if(addedBlog) {
        console.log(addedBlog)
        showNotification(blog)
        setBlogs(blogs.concat(addedBlog))
      }
    } catch(error) {
      showErrorMessage(error.response.data.error)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const loginPage = () => {
    return (
      <div>
        <h1>Log in to application</h1>
        <LoginForm username={username} password={password}
            handleLoginButton={handleLoginButton} handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange} />
      </div>
    )
  }

  const blogPage = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={notification} isError={false} />
        <LoggedUser user={user} handleLogoutButton={handleLogoutButton} />
        <h2> Create new blog </h2>
        <BlogForm handleCreateBlogButton={handleCreateBlogButton} title={title} handleTitleChange={handleTitleChange}
          author={author} handleAuthorChange={handleAuthorChange} url={url} handleUrlChange={handleUrlChange} />
        <BlogList blogs={blogs} />
      </div>
    )
  }

  return (
    <div>
      {errorMessage ? 
      <Notification message={errorMessage} isError={true} /> : null}
      {user === null ?
        loginPage() :
        blogPage()
      }
    </div>
  )
}
  


export default App