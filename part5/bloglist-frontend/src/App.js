import React, { useState, useEffect } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedUser from './components/LoggedUser'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const getBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const addBlog = async blogObject => {
    try {
      console.log('in try ')
      let addedBlog = await blogService.creat(blogObject)
      if(addedBlog) {
        showNotification(blogObject)
        setBlogs(blogs.concat(addedBlog))
      }
    } catch(error) {
      console.log('cought error:', error)
      showErrorMessage(`Blog Creation was not succussful`)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
        setBlogs(blogs.map(blog => 
          blog.id === id ?
          updatedBlog : blog
        ))
    }catch (error) {
      showErrorMessage(`update blog was not succussful`)
    }
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

  const showNotification = (blog) => {
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  
  const loginPage = () => {
    
    return (
      <div>
        <div>
          <LoginForm 
            username={username} 
            password={password}
            handleLoginButton={handleLoginButton} 
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange} 
          />
        </div>
      </div>
    )
  }

  const blogPage = () => {

    return (
      <div>
        <h2>Blogs</h2>
        <Notification 
          message={notification} 
          isError={false} 
        />
        <LoggedUser 
          user={user} 
          handleLogoutButton={handleLogoutButton}
        />
        <h2>Blogs</h2>
        <Togglable
         buttonShowLabel='create blog'
         buttonHideLabel='cancel'
        >
          <BlogForm 
            createBlog={addBlog} 
          />
        </Togglable>
        <BlogList 
          blogs={blogs} 
          user={user}
          updateBlog={updateBlog} 
        />
      </div>
    )
  }

  return (
    <div>
      {
      errorMessage ? 
        <Notification 
          message={errorMessage} 
          isError={true} 
        /> 
        : null
      }
      {
        user === null ?
          loginPage():blogPage()
      }
    </div>
  )
}
  


export default App