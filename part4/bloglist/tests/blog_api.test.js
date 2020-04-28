const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let i = 0; i < helper.initialBlogs.length; i++) {
        let blogObj = new Blog(helper.initialBlogs[i])
    await blogObj.save()
    }
})


describe('when there are elements in db', () => {
  test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
  })

  test(`there are ${helper.initialBlogs.length} blogs`, async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog in the blogs', async () => {
    const blogs = await helper.blogsInDb()
    const titles = blogs.map(b => b.title)
    expect(titles).toContain('First class tests')
  })
})
describe('viewing specific blog', () => {
  test('blogs id property', async () => {
    const blogs = await helper.blogsInDb()
    blogs.map(b => expect(b.id).toBeDefined())
  })
})

describe('adding a blog', () => {  
  test('valid data', async () => {
    await helper.insertToDB(helper.testerValid)
    const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogs).toContainEqual(expect.objectContaining(helper.testerValid))
  })

  test('when given no "likes" should set to zero', async () =>{
    await helper.insertToDB(helper.testerNoLikes)
    const blogs = await helper.blogsInDb()
    blogs.map(b => expect(b.likes).toBeDefined())
  })

  test('title is missing - should send 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.testerNoTitle)
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('url is missing - should send 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.testerNoUrl)
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('delete a blog', () => {
  test('delete existing blog in db', async () => {
    let blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogs).not.toContainEqual(blogToDelete)
  })

  test('delete not valid id', async () => {
    await api
      .delete('/api/blogs/1')
      .expect(400)
    
    blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  // test('delete non exists id', async () => {
  //   const validNonExistId = await helper.nonExistingId()
  //   await api
  //     .delete(`api/blogs/${validNonExistId}`)
  //     .expect(400)

  //     const blogs = await helper.blogsInDb()
  //     expect(blogs).toHaveLength(helper.initialBlogs.length)
  // })
})

describe('updating blog', () => {
  test('updating existing blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }
    const updatedBlog = await api
                        .put(`/api/blogs/${blogToUpdate.id}`)
                        .send(updatedBlog)
                        .expect(updatedBlog).toHaveProperty('likes', blogToUpdate.likes + 1)      
  })
})


afterAll(() => {
    mongoose.connection.close()
})