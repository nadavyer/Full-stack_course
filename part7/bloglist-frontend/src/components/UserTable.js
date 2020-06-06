import React from 'react'
import User from './User'


const UserTable = ({ usersBlogsCount }) => {
  const byBlogsCount = (u1, u2) => u2.userBlogCount - u1.userBlogCount


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
            name={user.name}
            blogsCount={user.userBlogCount}
          />
        </tbody>
      )}
    </table>
  )
}

export default UserTable