const Blog = require('../models/blog')

const initialBlogs = [
    { 
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    { 
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    },
     {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
     { 
     title: "Type wars",
     author: "Robert C. Martin",
     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
     likes: 2, 
    }
]

const testerValid = { 
  title: "tester",
  author: "tester",
  url: "tester",
  likes: 555
}

const testerNoLikes = { 
  title: "tester",
  author: "tester",
  url: "tester",
}

const testerNoTitle = { 
  author: "tester",
  url: "tester",
}

const testerNoUrl = { 
  title: "tester",
  author: "tester",
}

const insertToDB = async (testerBlog) => {
    const blog = new Blog(testerBlog)
    const response = await blog.save()
    return response
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog(testerValid)
    await blog.save()
    await blog.remove()

    return blog.id.toString()
}

module.exports = {
    initialBlogs,testerValid, testerNoLikes, testerNoTitle, testerNoUrl,
    insertToDB, blogsInDb, nonExistingId
}