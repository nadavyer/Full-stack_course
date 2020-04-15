import React from 'react'

const PersonForm =({ onSubmit, name, onNameChange, number, onNumberChange }) => {

  
    return(
      <form onSubmit={onSubmit}>
      <div>
        <div>name: <input name={name} onChange={onNameChange} /></div>
        <div>Number: <input number={number} onChange={onNumberChange} /></div>
      </div>
      <button type="submit"> add</button>
    </form>
    )
}

export default PersonForm