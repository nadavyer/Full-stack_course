
const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'VOTE_NOTIFICATION':
      state = `You have voted "${action.data.content}"` 
      return state

    case 'ADD_ANECDOTE_NOTIFICATION':
        state = `You have added the anecdote "${action.data.content}"`
      return state
      
    case 'REMOVE_NOTIFICATION':
      state = null
      return state
      
    default:
      return state
  }

}

//action creators
export const voteNotification = content => {
  return {
    type: 'VOTE_NOTIFICATION',
    data: { content }
  }
}

export const createAnecdoteNotification = content => {
  return {
    type: 'ADD_ANECDOTE_NOTIFICATION',
    data : { content } 
  }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export default notificationReducer