import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    const dispatch = useDispatch()

    const handleVoteButton = (anecdote) => {
      dispatch(vote(anecdote))
      dispatch(voteNotification(anecdote.content))
    }

    return (
        <div>
          {filteredAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => 
                  handleVoteButton(anecdote)
                }> vote </button>
              </div>
            </div>
          )
          }
        </div>
    )
}

export default AnecdoteList