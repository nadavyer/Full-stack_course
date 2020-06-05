let timeoutId = 0


const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'REMOVE_NOTIFICATION':
      state = null
      return state

    case 'SET_NOTIFICATION':
      state = action.data
      return state

    default:
      return state
  }

}

//action creators
export const setNotification = (notification, timeOut) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
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