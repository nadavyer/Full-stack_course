const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const saltRounds = 10
  const passwordHash = await bcrypt.hash('555', saltRounds)

  const user = new User({
    username: "nadavyer",
    name: "Nadav Yerushalmi",
    passwordHash,
  })

  await user.save()



    for (let i = 0; i < helper.initialBlogs.length; i++) {
        let blogObj = new Blog(helper.initialBlogs[i])
    await blogObj.save()
    }
})

const loginUser = async () => {
  const response = await api
  .post('/api/login')
  .send({
    username: "nadavyer",
    password: "555"
  })
  return response
}


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
  test('valid data add blog', async () => {
    const response = await loginUser()
    const token = 'Bearer '.concat(response.body.token)
    await api
    .post('/api/blogs')
    .send(helper.testerValid)
    .set({ Authorization: token })
    .expect(200)

    const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogs).toContainEqual(expect.objectContaining(helper.testerValid))
  })

  test('when given no "likes" should set to zero', async () =>{
    const response = await loginUser()
    const token = 'Bearer '.concat(response.body.token)
    await api
    .post('/api/blogs')
    .send(helper.testerNoLikes)
    .set({ Authorization: token })
    .expect(200)

    const blogs = await helper.blogsInDb()
    blogs.map(b => expect(b.likes).toBeDefined())
  })

  test('title is missing - should send 400', async () => {
    const response = await loginUser()
    const token = 'Bearer '.concat(response.body.token)
    await api
    .post('/api/blogs')
    .send(helper.testerNoTitle)
    .set({ Authorization: token })
    .expect(400)

    const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
      expect(blogs).not.toContainEqual(expect.objectContaining(helper.testerNoTitle))
  })

  test('url is missing - should send 400', async () => {
    const response = await loginUser()
    const token = 'Bearer '.concat(response.body.token)
    await api
    .post('/api/blogs')
    .send(helper.testerNoUrl)
    .set({ Authorization: token })
    .expect(400)

    const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
      expect(blogs).not.toContainEqual(expect.objectContaining(helper.testerNoUrl))
  })
})

describe('delete a blog', () => {
  test('delete existing blog in db', async () => {
    const response = await loginUser()
    const token = 'Bearer '.concat(response.body.token)
    const blogToDelete = await api
    .post('/api/blogs')
    .send(helper.testerValid)
    .set({ Authorization: token })
    .expect(200)

    let blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    blogsIds = blogs.map(blog => { blog.id })
    expect(blogsIds).not.toContain(blogToDelete.body.id)

    await api
      .delete(`/api/blogs/${blogToDelete.body.id}`)
      .set({ Authorization: token})
      .expect(204)
    
    blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
    blogsIds = blogs.map(blog => { blog.id })
    expect(blogsIds).not.toContain(blogToDelete.body.id)
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
  //   console.log(validNonExistId)
  //   await api
  //     .delete(`api/blogs/5ea937455ae621032c258db8`)
  //     .expect(400)

  //     const blogs = await helper.blogsInDb()
  //     expect(blogs).toHaveLength(helper.initialBlogs.length)
  // })
})

describe('updating blog', () => {
  test('updating existing blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const updatedBlog = { ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    const updatedBlogResponse = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    expect(updatedBlogResponse.body).toHaveProperty('likes', blogToUpdate.likes + 1)
  })

  test('updating non existing blog id', async () => {
    let blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const updatedBlog = { ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
    .put('/api/blogs/1')
    .send(updatedBlog)
    .expect(400)

    blogs = await helper.blogsInDb()
    expect(blogs).toContainEqual(blogToUpdate)
  })
})

describe('testing login', () => {
  test('valid loging', async () => {
    const response = await loginUser()
    console.log(response)
    expect(response).toHaveProperty('status', 200)
  })

  test('not valid username ', async () => {
    await api
    .post('/api/login')
    .send({
      username: "nada",
      password: "555"
    })
    .expect(401)
  })

  test('not valid pawssword ', async () => {
    await api
    .post('/api/login')
    .send({
      username: "nadavyer",
      password: "55"
    })
    .expect(401)
  })
})



afterAll(() => {
    mongoose.connection.close()
})