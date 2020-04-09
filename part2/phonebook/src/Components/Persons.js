import React from 'react'
import Person from './Person'

const Persons = ({ filteredPersons }) => {
    return(
        <div>
            {filteredPersons.map(person =>
            <Person key={person.name} name={person.name} number={person.number} />
        )}    
        </div>
    )
}

export default Persons