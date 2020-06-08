import React from 'react'
import User from './User'



const UserTable = ({ usersBlogsCount }) => {
  const byBlogsCount = (u1, u2) => u2.blogs.length - u1.blogs.length

  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          <td> blogs crated</td>
        </tr>
      </tbody>
      {usersBlogsCount.sort(byBlogsCount).map(user =>
        <tbody
          key={user.username}>
          <User
            user={user}
          />
        </tbody>
      )}
    </table>
  )
}

export default UserTable