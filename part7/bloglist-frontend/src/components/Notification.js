import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if ( !notification ) {
    return null
  }

  if (notification.flag === 'success') {
    return (
      <div className='container'>
        <Alert variant='success' >
          {notification.message}
        </Alert>
      </div>
    )
  }
  else {
    return (
      <div className='container'>
        <Alert variant='danger' >
          {notification.message}
        </Alert>
      </div>
    )}
}

export default Notification