import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { likeBlog, removeBlog, initializeBlogs } from '../reducers/blogsReducer'

const BlogList = (props) => {

  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogsReducer);
  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id);
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`);
    if (ok) {
      dispatch(removeBlog(id))
    }
  };

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id);
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id };
    dispatch(likeBlog(likedBlog))
  };

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);


  return (
    <div>{blogs.sort(byLikes).map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        own={props.user.username===blog.user.username}
      />
    )}</div>
  )
};

export default BlogList