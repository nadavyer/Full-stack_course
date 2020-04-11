import React from 'react'
import WeatherData from './WeatherData'


const CountryData = ({ country }) => {
    
    return (
        <div>
            <h1>{country.name}</h1>
            capital: {country.capital} <br/>
            population: {country.population} <br/>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag' height = '100px'/>
            <h3>weather in {country.name}</h3>
            <WeatherData capital={country.capital} />
        </div>
    )
}

export default CountryData