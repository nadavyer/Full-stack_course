import React from 'react'
import Button from './Button'

const PersonForm =({ onSubmit, namevalue, onNameChange, numbervalue, onNumberChange }) => {

  
    return(
      <form onSubmit={onSubmit}>
      <div>
        <div>name: <input namevalue={namevalue} 
        onChange={onNameChange} /></div>
        <div>Number: <input numbervalue={numbervalue}
        onChange={onNumberChange} /></div>
      </div>
      <Button />
    </form>
    )
}

export default PersonForm