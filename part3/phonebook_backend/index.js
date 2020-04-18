const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const utills = require('./utills')

const app = express()
app.use(cors())
app.use(express.json())
morgan.token('person', (request, response) => {
  return JSON.stringify(request.body)
})
//clog all POST 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person', {
  skip: function (req, res) {return req.method !== 'POST'}
}))
app.use(express.json())
// app.use(express.static('build'))
const password = process.argv[2]

const url =
  `mongodb+srv://nadavyer:010203@fullstackopen1-ohe7j.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = mongoose.model('Person', personSchema)

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
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter(p => p.id !== id)
    res.json(persons)
  }
  else {
    res.status(204).end()
  }
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  console.log(person)
  if (!utills.validAddInput(person)) {
    res.send({error: 'name or number is missing'})
  }
  else if (utills.nameInPhonebook(person.name, persons)) {
    res.send({error: 'name must be unique'})
  }
  else {
    person.id = maxId++
    persons = persons.concat(person)
    res.json(person)
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})