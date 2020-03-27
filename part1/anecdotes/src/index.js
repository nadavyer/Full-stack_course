import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text}</button>
)

const Header = ({text}) => {
  return(
    <>
      <h1>
        {text}
      </h1>
    </>
  )
}

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const header1 = 'Anecdote of the day'
  const header2 = 'Anecdote with most votes'

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const genRandomAnecdote = () => {
    let randNum = selected
    while (randNum === selected) {
      randNum = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randNum)
  }

  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

  return (
    <div>
      <Header text={header1} />
      {props.anecdotes[selected]}<br/>
      has {votes[selected]} votes <br/>
      <Button onClick={handleVoteClick} text={"vote"} />
      <Button onClick={genRandomAnecdote} text={"next anecdote"} />
      <Header text={header2} />
      {props.anecdotes[indexOfMax(votes)]}<br/>
      has {Math.max(...votes)} votes<br/>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)