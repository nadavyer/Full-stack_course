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
  skip: function (request, response) {return request.method === 'GET'}
}))



app.get('/info', (request, response) => {
  Person.collection.countDocuments()
  .then(count => 
    response.send(`Phonebook has info for ${count} people </br></br>${utills.getCurrentTime()} (GMT+3 Middle East Time Zone)`))
  .catch(error => next(error))
  
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
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if (result) response.status(204).end()
      else {
        response.status(400).send({ error: 'was already deleted'})
      }
      
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  Person.find({ name: body.name })
  .then(result => {
      const person = new Person({
        name: body.name,
        number: body.number,
      })
      person.save()
      .then(savedPerson => {
        response.json(savedPerson.toJSON())
      })
      .catch(error => next(error))
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
      name: body.name,
      number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => {
    response.json(updatedPerson.toJSON())
  })
  .catch(error => next(error))
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
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})