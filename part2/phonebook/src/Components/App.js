import React, { useState, useEffect } from 'react'
import Persons from './Persons.js'
import Filter from './Filter.js'
import PersonForm from './PersonForm'
import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([])
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
        window.alert(`${newName} is already added to phonebook`)
    }else {
        const personObj = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(personObj))
        setNewName('')
        setNewNumber('')
    }
  }

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}

const filteredPersons =  newFilter === '' ? persons : persons.filter(person =>
   person.name.toLowerCase().includes(newFilter.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange}
       numberValue={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
        
    </div>
  )
}

export default App