import React from 'react'

const Total = ({ course }) => {
    const total = course.parts.reduce(
    (sum, curVal) => sum + curVal.exercises, 0)
    
    return(
      <h3>total of {total} exercises</h3>
    ) 
}

export default Total