import React from 'react'

const User = ({ name, blogsCount }) => {

  return (
    <tr>
      <td>{name}</td>
      <td> {blogsCount} </td>
    </tr>
  )
}



export default User