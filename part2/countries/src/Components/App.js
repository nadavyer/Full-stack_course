import React, { useState, useEffect } from 'react'
import Countries from './Countries.js'
import Filter from './Filter.js'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const filteredCountries =  newFilter === '' ? countries : countries.filter(country =>
     country.name.toLowerCase().includes(newFilter.toLowerCase()))
  

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {  
        setCountries(response.data)
      })
  }, []) 

  return (
    <div>
        <Filter value={newFilter} onChange={handleFilterChange} />
        <Countries filteredCountries={filteredCountries} setNewFilter={setNewFilter} />
    </div>
  )
}

export default App