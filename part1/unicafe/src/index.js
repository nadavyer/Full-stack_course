import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({text}) => {
  return(
    <>
      <h1>
        {text}
      </h1>
    </>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text}</button>
)


const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value} </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  let all = good + bad + neutral
  let average = (good - bad) / (good + neutral + bad) 
  let positive = ((good / (good + neutral + bad)) * 100) + ' %'
  if(good + bad + neutral === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <table>    
      <tbody>
        <Statistic text={"good "} value={good} />
        <Statistic text={"neutral "} value={neutral} />
        <Statistic text={"bad"} value={bad} />
        <Statistic text={"all "} value={all} />
        <Statistic text={"average "} value={average} />
        <Statistic text={"positive "} value={positive} />
      </tbody>
    </table>
  )
}


const App = () => {

  const header1 = 'give feedback'
  const header2 = 'statistics'

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
      <>
        <Header text={header1} />
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
        <Header text={header2} />
        <Statistics good={good} bad={bad} neutral={neutral} />
      </>
  )
}



ReactDOM.render(<App />, 
  document.getElementById('root')
)