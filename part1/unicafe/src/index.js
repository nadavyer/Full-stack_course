import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({text}) => {
  return(
    <div>
      <h1>
        {text}
      </h1>
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text}</button>
)

const Content = ({good, neutral, bad}) => {
  return (
    <div>
      <p>
        good {good}<br />
        neutral {neutral}<br/>
        bad {bad}<br/>
        average {(good - bad) / (good + neutral + bad)}<br/>
        positive {(good / (good + neutral + bad)) * 100} %<br/>
      </p>
    </div>
  )
}

const Statistics = (props) => {
  
  return (
    <div>
      <Header text={props.header} />
      <Content good={props.good} neutral={props.neutral} bad={props.bad} />
    </div>
  )
}


const App = () => {

  const header1 = 'give feedback'
  const header2 = 'statistics'
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  return (
      <div>
        <Header text={header1} />
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
        <Statistics header={header2} good={good} bad={bad} neutral={neutral} />
      </div>
  )
}



ReactDOM.render(<App />, 
  document.getElementById('root')
)