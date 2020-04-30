const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const assist = require('../utils/general_helpers')


usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))
  })


usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!assist.validPassword(body.password)) { //need to validate not with mongoose - hashing to db changes it 
      return response.status(400).json( { error: 'invalid password' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter