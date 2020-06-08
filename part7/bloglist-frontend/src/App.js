import React, { useEffect, useState } from 'react'
import LoginPage from './Pages/LoginPage'
import UsersPage from './Pages/UsersPage'
import BlogsPage from './Pages/BlogsPage'
import UsersBlogsPage from './Pages/UserBlogsPage'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'
import usersService from './services/users'
import { Switch, Route } from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer)
  const [users, SetUsers] = useState([])
  const blogFormRef = React.createRef();


  useEffect(() => {
    const userToLoad = storage.loadUser();
    dispatch(setUser(userToLoad))
  }, [dispatch])

  useEffect(() => {
    usersService.getAll()
      .then(users => SetUsers(users))
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
      <Route path='/users/:id'>
        <UsersBlogsPage user={user} users={users} handleLogout={handleLogout} />
      </Route>
      <Route path='/users'>
        <UsersPage user={user} users={users} handleLogout={handleLogout} />
      </Route>
      <Route path='/'>
        <BlogsPage user={user} handleLogout={handleLogout} blogFormRef={blogFormRef}/>
      </Route>
    </Switch>
  )
}


export default App