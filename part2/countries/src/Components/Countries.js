import React from 'react'
import CountryData from './CountryData'


const Countries = ({ filteredCountries, setNewFilter }) => {
    if(filteredCountries.length > 10){
         return(
            <div>
                Too many matches, specify another filter <br/>
            </div>
        )
    }
    else if (filteredCountries.length === 1) {  
        return (
            <CountryData country={filteredCountries[0]} />
        )
    }else {
        return(
            <div>
                {filteredCountries.map(country =>
                <div key={country.name}>
                     {country.name}  
                     <button onClick={ () => setNewFilter(country.name)} > show </button>
                </div> 
                )}    
            </div>
        )
    }
}

export default Countries