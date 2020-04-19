require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const utills = require('./utills')
const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())


//clog all POST 
logger.token('person', function (request, response) {
  return JSON.stringify(request.body)
})
app.use(logger(':method :url :status :res[content-length] - :response-time ms :person', {
  skip: function (request, response) {return request.method !== 'POST'}
}))



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


app.get('/info', (request, response) => {
  console.log(utills.getCurrentTime())
  response.end(`Phonebook has info for ${persons.length} people \n\n${utills.getCurrentTime()} (GMT+3 Middle East Time Zone)`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person.toJSON())
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!utills.validAddInput(body)) {
    response.status(400).json({ error: 'name or number is missing' })
  }
  else if (utills.nameInPhonebook(body.name, persons)) {
    response.send({ error: 'name must be unique' })
  }
  else {
    const person = new Person({
      name: body.name,
      number: body.number,
    })
    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})