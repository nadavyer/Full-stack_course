const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('user', { username: 1, name: 1 , blogs: 1})

  const usersBlogsCount = users.map(({ name, username, blogs}) => ({ name, username, userBlogCount: blogs.length }))
  response.json(usersBlogsCount)
})


module.exports = router