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
    blogService.getAll().then(blogs => {
      setBlogs( blogService.sortByLikes(blogs) )
    })
  }

  const addBlog = async blogObject => {
    try {
      const addedBlog = await blogService.createBlog(blogObject)
      if(addedBlog) {
        setBlogs(blogService.sortByLikes(blogs.concat(addedBlog)))
        showNotification(`a new blog ${blogObject.title} by ${blogObject.author}`)
      }
    } catch(error) {
      console.log('cought error:', error)
      showErrorMessage(`Blog creation was not succussful`)
    }
  }

  const deleteBlog = async id => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogService.sortByLikes(blogs.filter(blog => blog.id !== id)))
      showNotification(`Blog deleted`)
    }catch (error) {
      console.log('cought error:', error)
      showErrorMessage(`Blog deletion was not succussful`)

    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
        setBlogs(blogService.sortByLikes(blogs.map(blog => 
          blog.id === id ?
          updatedBlog : blog
        )))
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

  const showNotification = (message) => {
    setNotification(
      message
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
      console.log(user)
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
            addBlog={addBlog} 
          />
        </Togglable>
        <BlogList 
          blogs={blogs} 
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog} 
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