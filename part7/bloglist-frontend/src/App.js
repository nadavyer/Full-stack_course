import React, { useEffect, useState } from 'react'
import LoginPage from './Pages/LoginPage'

import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'
import usersBlogsCountService from './services/users'
import UsersPage from './Pages/UsersPage'
import BlogsPage from './Pages/BlogsPage'
import { Switch, Route } from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer)
  const [usersBlogsCount, setusersBlogsCount] = useState([])
  const blogFormRef = React.createRef();


  useEffect(() => {
    const userToLoad = storage.loadUser();
    dispatch(setUser(userToLoad))
  }, [dispatch])

  useEffect(() => {
    usersBlogsCountService.getAll()
      .then(usersBlogsCount => setusersBlogsCount(usersBlogsCount))
  }, [])


  const handleLogin = async (username, password) => {
    dispatch(loginUser(username, password))
  }
  const handleLogout = () => {
    dispatch(logoutUser())
    storage.logoutUser()
  };


  if (!user) {
    return (
      <LoginPage handleLogin={handleLogin}/>
    )
  }

  return (
    <Switch>
      <Route path='/users'>
        <UsersPage user={user} handleLogout={handleLogout} usersBlogsCount={usersBlogsCount} />
      </Route>
      <Route path='/'>
        <BlogsPage user={user} handleLogout={handleLogout} blogFormRef={blogFormRef}/>
      </Route>
    </Switch>
  )
}


export default App