let timeoutId = 0

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data

  case 'REMOVE_NOTIFICATION':
    return null

  default:
    return state
  }
}

//action creators
export const notifyWith = (message, flag='success', timeOut=5) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, flag }
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeOut*1000)
  }
}

export const removeNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_NOTIFICATION'
    })
  }
}

export default notificationReducer