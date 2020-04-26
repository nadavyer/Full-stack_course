/* eslint-disable */
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favBlog, blog) => {
        return favBlog.likes >= blog.likes ? favBlog : blog 
    }
    if (blogs.length === 0) return undefined
    const blogsData = blogs.map(({ title, author, likes }) => ({ title, author, likes }))
    return blogsData.reduce(reducer, blogsData[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined
    const blogsData = blogs.map(({ author }) => ({ author }))
    const blogsPerAuthor = blogsData.reduce((authorsCount, author) => {
        if (!authorsCount[author.author]) authorsCount[author.author] = 1
        else {
            authorsCount[author.author] += 1
        }
        return authorsCount
    }, {})
    let topBlogsAuthor = ''
    let authorBlogCount = 0
    for (author of Object.keys(blogsPerAuthor)) {
        if(blogsPerAuthor[author] >= authorBlogCount) {
            topBlogsAuthor = author
            authorBlogCount = blogsPerAuthor[author]
        }
    }
    return {
        author: topBlogsAuthor,
        blogs: authorBlogCount
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined
    const blogsData = blogs.map(({ author, likes }) => ({ author, likes }))
    const likesPerAuthor = blogsData.reduce((authorsCount, author) => {
        if (!authorsCount[author.author]) authorsCount[author.author] = author.likes
        else {
            authorsCount[author.author] += author.likes
        }
        return authorsCount
    }, {})
    let toplikesAuthor = ''
    let authorlikesCount = 0
    for (author of Object.keys(likesPerAuthor)) {
        if(likesPerAuthor[author] >= authorlikesCount) {
            toplikesAuthor = author
            authorlikesCount = likesPerAuthor[author]
        }
    }
    return {
        author: toplikesAuthor,
        likes: authorlikesCount
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}