import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/users'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export const create = (user) => {
  const request = axios.post(baseUrl, user)
  return request.then(response => response.data)
}

const update = (user) => {
  const request = axios.put(`${baseUrl}/${user.id}`, user, getConfig())
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

export default { getAll, getById, create, update, remove }