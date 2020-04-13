import React, { useState, useEffect } from 'react'
import PersonsList from './PersonsList.js'
import Filter from './Filter.js'
import PersonForm from './PersonForm'
import personsServices from '../services/personsServices'


const App = () => {

  const [persons, setPersons] = useState([])
  const [ name, setName ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const getAllPersons = () => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(getAllPersons, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(name)) {
        window.alert(`${name} is already added to phonebook`)
    }else {
      const personObj = {name, number}
      personsServices
      .create(personObj)
      .then(addedPerson => { 
        setPersons(persons.concat(addedPerson))
        setName('')
        setNumber('')
      })   
    }
  }


const handleDeleteBtn = (id) => {
  const personToDel = persons.find(person => person.id === id)
  if (window.confirm(`Delete ${personToDel.name}?`)){
    personsServices
  .remove(id)
  .then(setPersons(persons.filter(person =>
    person.id !== id)))
  }

}


const handleNameChange = (event) => {
  const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
        setName(event.target.value)
      }
  
}

const handleNumberChange = (event) => {
  setNumber(event.target.value)
}

const handleFilterChange = (event) => {
  setFilter(event.target.value)
}

const filteredPersons =  filter === '' ? persons : persons.filter(person =>
   person.name.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={name} onNameChange={handleNameChange}
       numberValue={number} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsList filteredPersons={filteredPersons} handleDeleteBtn={handleDeleteBtn} />
        
    </div>
  )
}

export default App