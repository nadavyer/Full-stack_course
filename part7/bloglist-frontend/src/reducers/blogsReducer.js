import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data).sort(byLikes)

  case 'INIT':
      console.log(action.data)
    return action.data.sort(byLikes)

  default:
    return state.sort(byLikes)
  }

}

//action creators
export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.newBlog(content)
    dispatch({
      type: 'NEW_BLOG',
      data : newBlog
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