import React from 'react'
import Button from './Button'

const Form =({ input, setNewName }) => {

  
    return(
        <form onSubmit={addPerson}>
        <div>
          name: <input value={input}
          onChange={handlePersonChange} />
        </div>
        <Button />
      </form>
    )
}

export default Form