const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    if (deletedBlog) {
        response.status(204).end()
    }
    else {
        response.status(400).json( 
            {error: `no blog with the following id: ${request.params.id}`})
    }
})

blogsRouter.put('/id:', async (request, response) => {
    const blog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter

