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
      <Part name={props.parts[0].name} excer={props.parts[0].exercises} />
      <Part name={props.parts[1].name} excer={props.parts[1].exercises} />
      <Part name={props.parts[2].name} excer={props.parts[2].exercises} />
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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}  /> 
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
    
  )
}


ReactDOM.render(<App />, document.getElementById('root'))