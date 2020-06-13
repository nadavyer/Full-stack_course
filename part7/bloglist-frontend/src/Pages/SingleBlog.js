import React from 'react'
import Notification from '../components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import Blog from '../components/Blog'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import Navigator from '../components/Navigator'
import BlogsComment from '../components/BlogsComment'


const SingleBlog = ({ user, handleLogout }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogsReducer)
  const blogToShow = blogs.find(blog => String(blog.id) === String(id))

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id);
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`);
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id);
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id };
    dispatch(likeBlog(likedBlog))
  }
  if (!blogToShow) {
    return (
      <Redirect to='/blogs' />
    )}

  return (
    <div>
      <Navigator user={user} handleLogout={handleLogout} />
      <h2>Blogs</h2>

      <Notification/>

      <Blog
        blog={blogToShow}
        handleLike={handleLike}
        handleRemove={handleRemove}
        own={user.username === blogToShow.user.username}
      />
      <div>
        <BlogsComment blog={blogToShow} />
      </div>
    </div>
  )
}
export default SingleBlog
