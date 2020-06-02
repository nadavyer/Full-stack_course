import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'

import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, removeBlog, likeBlog } from './reducers/blogsReducer'
import { notifyWith } from './reducers/notificationReducer'
import BlogList from './components/BlogList'


const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = React.createRef()



  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])


  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      dispatch(notifyWith(`${user.name} welcome back!`))
      storage.saveUser(user)
    } catch(exception) {
      dispatch(notifyWith('wrong username/password', 'error'))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }


  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogList user={user} />
    </div>
  )
}

export default App