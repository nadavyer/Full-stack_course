import React from 'react'


const Person = ({ name, number }) => {

    return (
        <li>
            {name}  {number} <br/>
        </li>
    )
}


export default Person