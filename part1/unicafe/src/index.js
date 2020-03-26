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


const Statistic = ({text, value}) => {
  return (
    <div>
      {text} {value} <br/>
    </div>
  )
}

const Statistics = (props) => {
  if(props.good + props.bad + props.neutral === 0) {
    return (
      <div>
        <Header text={props.header} />
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header text={props.header} />
      <Statistic text={"good"} value={props.good} />
      <Statistic text={"neutral"} value={props.neutral} />
      <Statistic text={"bad"} value={props.bad} />
      <Statistic text={"average"} value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
      <Statistic text={"positive"} value={((props.good / (props.good + props.neutral + props.bad)) * 100) + ' %'} />
    </div>
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