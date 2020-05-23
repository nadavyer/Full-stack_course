import React from 'react'

const Notification = ({ notification }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
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