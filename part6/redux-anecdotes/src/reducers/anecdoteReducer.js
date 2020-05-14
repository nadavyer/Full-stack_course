import anecdoteService from '../services/anecdotes'

const sortByVotes = array => {
  return array.sort((anecdote, anecdoteToCompare) => anecdoteToCompare.votes - anecdote.votes)
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_VOTE':
      const anecdoteToChange = action.data
      return sortByVotes(state.map(anecdote => 
        anecdote.id === anecdoteToChange.id ? anecdoteToChange : anecdote))

    case 'NEW_ANECDOTE':
      return sortByVotes(state.concat(action.data))

    case 'INIT_ANECDOTES': 
        return sortByVotes(action.data)
        
    default:
      return sortByVotes(state)
  }

}

//action creators
export const vote = anecdote => {
  return async dispatch => {
    const updatedAnecdoteObject = { ...anecdote, votes: anecdote.votes + 1 } 
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, updatedAnecdoteObject)
    dispatch({
      type: 'ADD_VOTE',
    data:  updatedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.newAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data : newAnecdote
    })

  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer