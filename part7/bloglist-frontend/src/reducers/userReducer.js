import { notifyWith } from './notificationReducer'
import { USER_ACTIONS } from './Actions';
import loginService from '../services/login';
import storage from '../utils/storage'


const userReducer = (state = null, action) => {
  switch (action.type) {
  case USER_ACTIONS.LOGIN:
    state = action.data
    return state

  case USER_ACTIONS.SET_USER:
    state = action.data
    return state

  case USER_ACTIONS.LOGOUT:
    state = null
    return state

  default:
    return state
  }
};

//action creators
export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      dispatch({
        type: USER_ACTIONS.LOGIN,
        data: user
      })
      storage.saveUser(user)
      dispatch(notifyWith(`${user.name} welcome back!`));
    } catch (e) {
      dispatch(notifyWith('Wrong username/password', 'error'));
    }

  }
}

export const setUser = user => {
  return async dispatch => {
    dispatch({
      type: USER_ACTIONS.SET_USER,
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: USER_ACTIONS.LOGOUT
    })
  }
}


export default userReducer