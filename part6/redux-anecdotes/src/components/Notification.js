import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
  return (
    <div>
      {notification ? 
        <div style={style}>
          {notification}
        </div> : null
      }
    </div>
  )
}

export default Notification