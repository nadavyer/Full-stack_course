import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = async (content) => {
    const anecdoteObject = {
        content: content,
        id: getId(),
         votes: 0
    }
    const response = await axios.post(baseUrl, anecdoteObject)
    return response.data
}

const updateAnecdote = async (id, updatedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
} 

export default { 
    getAll, 
    newAnecdote ,
    updateAnecdote
}