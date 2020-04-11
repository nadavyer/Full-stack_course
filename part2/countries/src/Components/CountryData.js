import React from 'react'


const CountryData = ({ country }) => {
    return(
        <div>
            <h1>{country.name}</h1>
            capital {country.capital} <br/>
            population {country.population} <br/>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag' height = '100px'/>
        </div>
    )
}

export default CountryData