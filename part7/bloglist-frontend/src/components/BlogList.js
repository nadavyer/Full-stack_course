import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogsReducer);
  const byLikes = (b1, b2) => b2.likes - b1.likes;



  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}> {blog.title} - {blog.author} </Link>
        </div>
      )}
    </div>
  )
}

export default BlogList