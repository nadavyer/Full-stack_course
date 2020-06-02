import loginService from '../services/login'
import notifyWith from './notificationReducer'
import storage from '../store'



const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data

  case 'SET_USER':
    return action.data

  case 'LOGOUT':
    return action.data

  default:
    return state
  }
}

//action creators
export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    dispatch({
      type: 'LOGIN',
      data : user
    })
  }
}

export const setUser = user => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data : user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data : null
    })
  }
}


export default userReducer