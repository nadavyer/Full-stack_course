import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showInfo, setShowInfo] = useState(false)
  const [buttonInfo, setButtonInfo] = useState('view')

  const handleViewButton = () => {
    setShowInfo(!showInfo)
    showInfo ? 
    setButtonInfo('view') : setButtonInfo('hide')
  }

  const handleLikeButton = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const showBlogContent = () =>{

    return (
      <div>
          {blog.url} <br/>
          <div>
            Likes: {blog.likes}
            <button onClick={handleLikeButton}> Like </button> 
          </div>
          {user.name} <br/>
          {user.id === blog.user ?
            <button onClick={handleDeleteBlog} >Delete </button> 
            : null
          }
        </div>
    )
  }
  
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleViewButton}> {buttonInfo} </button> 
      {showInfo ? 
      showBlogContent() : null}  
    </div>
  )
}
export default Blog
