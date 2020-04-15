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
    
  const updatePerson = (origPerson) => {
    const updatedPerson = { ...origPerson, number: number }
    personsServices
    .update(updatedPerson.id, updatedPerson)
    .then(personToSet => 
      setPersons(persons.map(person => person.id !== origPerson.id ? person : personToSet)))
  }

  const validateName = () => {
    const reg = /^[a-zA-Z ]*$/
    const trimedName = name.trim()
    if (!reg.test(trimedName) || trimedName === '') {
      window.alert(`"${name}" is not a valid name`)
      return false;
   }
    return true;
  }

  const validateNumber = () => {
    const reg = /^[0-9]*$/
    const trimedNumber = number.trim()
    if (!reg.test(trimedNumber) || trimedNumber === '') {
      window.alert(`"${number}" is not a valid number`)
      return false;
   }
    return true;
  }
  

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(name) && validateName() && validateNumber()) { //update person
        if (window.confirm(`${name} is already added to phonebook, replace old number with a new one?`)) {
          const origPerson = persons.find(p => p.name === name)
          updatePerson(origPerson)
        }
    }else {//add new person
      if (validateName() && validateNumber() ) {
        const personObj = {name, number}
          personsServices
          .create(personObj)
          .then(addedPerson => 
            setPersons(persons.concat(addedPerson)))
      }
    }
    setName('')
    setNumber('')
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
    setName(event.target.value)
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
      <PersonForm onSubmit={addPerson} name={name} onNameChange={handleNameChange}
      number={number} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsList filteredPersons={filteredPersons} handleDeleteBtn={handleDeleteBtn} />
        
    </div>
  )
}


export default App