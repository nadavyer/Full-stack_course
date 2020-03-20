import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <p>
      <h1>{props.course}</h1>
      </p>
    </div>
  )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.excer} </p>
        </div>
    )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.partOne.name} excer={props.partOne.exercises} />
      <Part name={props.partTwo.name} excer={props.partTwo.exercises} />
      <Part name={props.partThree.name} excer={props.partThree.exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content partOne={part1} partTwo={part2} partThree={part3}  /> 
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
    
  )
}


ReactDOM.render(<App />, document.getElementById('root'))