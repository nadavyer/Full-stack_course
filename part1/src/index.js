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
      <Part name={props.partOne[0]} excer={props.partOne[1]} />
      <Part name={props.partTwo[0]} excer={props.partTwo[1]} />
      <Part name={props.partThree[0]} excer={props.partThree[1]} />
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header course={course} />
      <Content partOne={[part1, exercises1]} partTwo={[part2, exercises2]} partThree={[part3, exercises3]}  /> 
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
    
  )
}


ReactDOM.render(<App />, document.getElementById('root'))