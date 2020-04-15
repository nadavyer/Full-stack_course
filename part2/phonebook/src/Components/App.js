import React, { useState, useEffect } from 'react'

import PersonsList from './PersonsList'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'

import personsServices from '../services/personsServices'


const App = () => {

  const [persons, setPersons] = useState([])
  const [ name, setName ] = useState("")
  const [ number, setNumber ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
        .then(personToSet => {
          setPersons(persons.map(person => person.id !== origPerson.id ? person : personToSet))
        })
        .catch(error => {
          showErrorMessageDelete(origPerson.name)
          setPersons(persons.filter(p => p.id !== origPerson.id))
        })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(name) && validateName() && validateNumber()) { //update person
        if (window.confirm(`${name} is already added to phonebook, replace old number with a new one?`)) {
          const origPerson = persons.find(p => p.name === name)
          updatePerson(origPerson)
          showNotification(origPerson.name, 'updated')
        }
    }else {//add new person
      if (validateName() && validateNumber() ) {
        const personObj = {name, number}
          personsServices
          .create(personObj)
          .then(addedPerson => 
            setPersons(persons.concat(addedPerson)))
            showNotification(name, 'added')
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
          .then(() => { setPersons(persons.filter(person => 
            person.id !== id))
            showNotification(personToDel.name, 'deleted')
          })
        .catch(error => {
            showErrorMessageDelete(personToDel.name)
            setPersons(persons.filter(p => p.id !== id))
          })
    }

  }

  const showNotification = (personName, text) => {//text = updated or deleted or added
    setNotification(
      `Contact '${personName}' has ${text}`
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const showErrorMessageDelete = (personName) => {
    setErrorMessage(
      `Contact '${personName}' has already deleted`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
      <h1>Phonebook</h1>
      {errorMessage ? 
      <Notification message={errorMessage} isError={true} /> : null}
      {notification ?
      <Notification message={notification} isError={false} /> : null }
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new contact</h2>
      <PersonForm onSubmit={addPerson} name={name} onNameChange={handleNameChange}
      number={number} onNumberChange={handleNumberChange} />
      <h2>Contacts</h2>
      <PersonsList filteredPersons={filteredPersons} handleDeleteBtn={handleDeleteBtn} />
        
    </div>
  )
}


export default App