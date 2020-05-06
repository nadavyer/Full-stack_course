import React from 'react'

const LoggedUser = ({ user, handleLogoutButton }) => {

  return (
    <div>
      <p>
        {`${user.name} logged in`}
        <button onClick={handleLogoutButton}> logout </button>
      </p>
    </div>
  )
}

export default LoggedUser