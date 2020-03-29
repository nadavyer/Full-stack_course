import React, { useState } from 'react'
import Button from './Button'
import Person from './Person.js'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('adding person clicked', event.target)
    const personObj = {
        name: newName,
    }


    setPersons(persons.concat(personObj))
    setNewName('')
  }

const handlePersonChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handlePersonChange} />
        </div>
        <Button />
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
        <Person key={person.name} name={person.name} />
        )}    
    </div>
  )
}

export default App