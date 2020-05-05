import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, updateBlog }) => {

    return (
        <div>
            {blogs.map(blog =>
            <Blog 
                key={blog.id} 
                blog={blog} 
                user={user}
                updateBlog={updateBlog}
            />
            )}
        </div>
    )
}

export default BlogList