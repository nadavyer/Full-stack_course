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

const Content = ({good, neutral, bad, all, average, positive}) => {
  return (
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
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
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGeneralClick = () => {
    setAll(all + 1)
    console.log(good, neutral, bad, all, average, positive )
    setAverage(((good - bad) / all))
    setPositive(good / all)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    handleGeneralClick()
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    handleGeneralClick()
  }

  const handleGoodClick = () => {
    setGood(good + 1)
    handleGeneralClick()
  }

  return (
      <div>
        <Header text={header1} />
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
        <Header text={header2} />
        <Content good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
      </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)