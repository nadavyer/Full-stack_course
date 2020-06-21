const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const assist = require('../utils/list_helper')

router.get('/', async (request, response) => {
  const users = await User
    .find({}).populate({
      path: "blogs",
      model: "Blog"
    })

  const userJson = users.map(user => user.toJSON())
  response.json(userJson)
})

router.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id).populate('user')
  response.json(user)
})

router.post('/', async (request, response) => {
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


module.exports = router