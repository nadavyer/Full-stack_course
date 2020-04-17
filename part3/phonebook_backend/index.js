const express = require('express')
const utills = require('./utills')
const app = express()

app.use(express.json())

let persons = [
    { 
      name: "Arto Hellas", 
      number: "040-123456",
      id: 1
    },
    { 
      name: "Ada Lovelace", 
      number: "39-44-5323523",
      id: 2
    },
    { 
      name: "Dan Abramov", 
      number: "12-43-234345",
      id: 3
    },
    { 
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      id: 4
    }
  ]

  let maxId = persons.length + 1


app.get('/info', (req, res) => {
  console.log(utills.getCurrentTime())
  res.end(`Phonebook has info for ${persons.length} people \n\n${utills.getCurrentTime()} (GMT+3 Middle East Time Zone)`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.post('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter(p => p.id !== id)
    res.json(persons)
  }
  else {
    res.status(404).end()
  }
})

app.post('/api/persons/', (req, res) => {
  const person = req.body
  if (!utills.validAddInput(person)) {
    res.send({error: 'name or number is missing'})
  }
  else if (utills.nameInPhonebook(person.name, persons)) {
    res.send({error: 'name must be unique'})
  }
  else {
    person.id = maxId++
    persons = persons.concat(person)
    res.json(persons)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})