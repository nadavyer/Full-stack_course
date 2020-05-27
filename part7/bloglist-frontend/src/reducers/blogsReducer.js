import blogService from '../services/blogs'



const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT':
    return action.data

  case 'NEW_BLOG':
    return state.concat(action.data)

  case 'REMOVE_BLOG': {
    const blogId = action.data
    return state.filter(blog => blog.id !== blogId)
  }
  case 'ADD_LIKE': {
    const updatedBlog = action.data
    return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
  }
  default:
    return state
  }
}

//action creators
export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data : newBlog
    })
  }
}

export const removeBlog = blogId => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blogId
    })
  }
}

export const likeBlog = likedBlog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'ADD_LIKE',
      data:  updatedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export default blogsReducer