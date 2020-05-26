import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'title tester',
    author: 'author tester',
    url: 'url tester',
    likes: 555,
    user: 1
  }

  const user = {
    name: 'name tester',
    username: 'username tester',
    id: 1
  }
  test('render blog', () => {
    const component = render(
      <Blog blog={blog} />
    )
    let div = component.container.querySelector('.blogDefaultContent')
    expect(div).toHaveTextContent('title tester')
    expect(div).not.toHaveTextContent('url tester')
    expect(div).not.toHaveProperty('Likes', 555)
    div = component.container.querySelector('.moreInfo')
    expect(div).toBeNull()
  })

  test('clicking on `view` button makes it show url and likes', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    )

    let button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.blogView')
    expect(div).toHaveTextContent('url tester')
    expect(div).toHaveTextContent('Likes')
  })

  test('double click on like', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    )
    let viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    component.debug()
    let likesButton = component.container.querySelector('.likes-button')
    for (let i = 0 ; i < 100; i++) {fireEvent.click(likesButton)}
    expect(mockHandler.mock.calls).toHaveLength(100)
  })
})