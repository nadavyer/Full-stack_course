import React from 'react'
import Button from './Button'

const PersonForm =({ onSubmit, nameValue, onNameChange, numberValue, onNumberChange }) => {

  
    return(
      <form onSubmit={onSubmit}>
      <div>
        <div>name: <input nameValue={nameValue} 
        onChange={onNameChange} /></div>
        <div>Number: <input numberValue={numberValue}
        onChange={onNumberChange} /></div>
      </div>
      <Button />
    </form>
    )
}

export default PersonForm