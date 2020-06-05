import blogService from '../services/blogs'
import { notifyWith } from './notificationReducer'
import { BLOG_ACTIONS } from './Actions';


const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case BLOG_ACTIONS.INIT:
    return action.data;

  case BLOG_ACTIONS.NEW_BLOG:
    return state.concat(action.data);

  case BLOG_ACTIONS.REMOVE_BLOG: {
    const blogId = action.data;
    return state.filter(blog => blog.id !== blogId)
  }
  case BLOG_ACTIONS.ADD_LIKE: {
    const updatedBlog = action.data;
    return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
  }
  default:
    return state
  }
};

//action creators
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: BLOG_ACTIONS.INIT,
      data: blogs
    })
  }
};

export const addBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({
        type: BLOG_ACTIONS.NEW_BLOG,
        data: newBlog
      })
      notifyWith(`New blog "${blog.title}" by ${blog.author} created`)(dispatch)
    } catch (error) {
      notifyWith('Error creating bew blog', 'error')(dispatch)
    }
  }
}

export const removeBlog = blogId => {
  return async dispatch => {
    try {
      await blogService.remove(blogId);
      dispatch({
        type: BLOG_ACTIONS.REMOVE_BLOG,
        data: blogId
      })
      notifyWith('Blog deleted')(dispatch)
    } catch (e) {
      notifyWith('Blog was already removed', 'error')(dispatch)

    }

  }
};

export const likeBlog = likedBlog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(likedBlog);
    dispatch({
      type: BLOG_ACTIONS.ADD_LIKE,
      data: updatedBlog
    })
  }
};



export default blogsReducer