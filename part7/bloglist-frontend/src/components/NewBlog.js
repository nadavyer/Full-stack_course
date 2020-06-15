import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const createBlog = blog => {
    dispatch(addBlog(blog));
    props.blogFormRef.current.toggleVisibility()
  };

  const handleNewBlog = (event) => {
    event.preventDefault();

    createBlog({
      title, author, url
    });


    setTitle('');
    setAuthor('');
    setUrl('')
  };

  return (

    <div>
      <h2>create new blog</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <div >
            <Button variant="secondary" type="submit">
                create
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
};

export default NewBlog