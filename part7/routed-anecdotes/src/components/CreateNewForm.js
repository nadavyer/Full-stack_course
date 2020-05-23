import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()

      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      
      history.push('/anecdotes')
    }

    const cleanReset = ({ reset, ...rest }) => rest

    const handleReset = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div>
            content
            <input {...{...content, reset: null}} />
          </div>
          <div>
            author
            <input {...{...author, reset: null}} />
          </div>
          <div>
            url for more info
            <input {...{...info, reset: null}} />
          </div>
          <button type='submit'> create </button>
          <button type='reset'> reset </button>
        </form>
      </div>
    )
  
}

export default CreateNew