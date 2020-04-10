import React from 'react'
import Country from './Country'
import CountryExpanded from './CountryExapanded'

const Countries = ({ filteredCountries }) => {
    if(filteredCountries.length > 10){
         return(
            <div>
                Too many matches, specify another filter <br/>
            </div>
        )
    }
    else if (filteredCountries.length === 1) {
        return( 
            <div>
                <CountryExpanded country={filteredCountries[0]} />
            </div>
        )
    }else {
        return(
            <div>
                {filteredCountries.map(country =>
                <Country key={country.name} name={country.name} />
            )}    
            </div>
        )
    }
}

export default Countries