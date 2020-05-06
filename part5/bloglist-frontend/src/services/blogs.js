import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = () => {
  const config = {
    headers: { Authorization: token },
  }
  return config
}

const sortByLikes = array => {
  return array.sort((blog, blogToCompare) => blogToCompare.likes - blog.likes)
}

const createBlog = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, getConfig())
  return request.then(response => response.data)
}

const deleteBlog = async id => {
  const request = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.data
}

export default { getAll, setToken, createBlog, update, deleteBlog, sortByLikes }