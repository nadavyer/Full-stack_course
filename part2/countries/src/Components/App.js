import React, { useState, useEffect } from 'react'
import Countries from './Countries.js'
import Filter from './Filter.js'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}



const filteredCountries =  newFilter === '' ? countries : countries.filter(country =>
   country.name.toLowerCase().includes(newFilter.toLowerCase()))



  return (
    <div>
        <Filter value={newFilter} onChange={handleFilterChange} />
        <Countries filteredCountries={filteredCountries} setNewFilter={setNewFilter} />
    </div>
  )
}

export default App