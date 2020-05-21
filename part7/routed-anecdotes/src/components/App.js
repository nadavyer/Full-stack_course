import React, { useState } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import Menu from './Menu'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNewForm'
import Footer from './Footer'
import Anecdote from './Anecdote'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')
  const padding = {
    paddingRight: 5
  }
  
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      {/* <Menu /> */}
          <div>
            <Link style={padding} to='/'> home  </Link>
            <Link style={padding} to='/anecdotes'> anecdotes </Link>
            <Link style={padding} to='/create'> create new </Link>
            <Link style={padding} to='/about'> about </Link>
          </div>
        <Switch>
            <Route path='/anecdotes/:id'>
              <Anecdote anecdote={anecdote} />
            </Route>
            <Route path="/anecdotes">
              <AnecdoteList anecdotes={anecdotes} />
            </Route>
            <Route path='/create'>
              <CreateNew addNew={addNew} />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
          </Switch>
      {/* <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} /> */}
      <Footer />
    </div>
  )
}

export default App

