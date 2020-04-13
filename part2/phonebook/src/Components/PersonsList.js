import React from 'react'

const PersonsList = ({ filteredPersons, handleDeleteBtn }) => {
    return(
        <div>
            {filteredPersons.map(person =>
            <div key={person.name}>
                {person.name} {person.number}
                <button onClick={() => handleDeleteBtn(person.id)}> delete </button>
            </div>
            )}
        </div>  
    )
}

export default PersonsList