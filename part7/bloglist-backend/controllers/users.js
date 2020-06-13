const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

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


module.exports = router