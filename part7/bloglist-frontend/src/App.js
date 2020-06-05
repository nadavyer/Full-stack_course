import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, setUser } from './reducers/userReducer';


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer)
  const blogFormRef = React.createRef();


  useEffect(() => {
    const userToLoad = storage.loadUser();
    dispatch(setUser(userToLoad))
  }, []);


  const handleLogin = async (username, password) => {
    dispatch(loginUser(username, password))
  }
  const handleLogout = () => {
    dispatch(logoutUser())
    storage.logoutUser()
  };


  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification/>
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }


  return (
    <div>
      <h2>Blogs</h2>

      <Notification/>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogList user={user}/>
    </div>
  )
};

export default App