/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
    test('form sends the correct input', () => {
        const addBlog = jest.fn()
        const component = render(
            <BlogForm addBlog={addBlog} />
        )
        const titleInput = component.container.querySelector('.title')
        const authorInput = component.container.querySelector('.author')
        const urlInput = component.container.querySelector('.url')
        const form = component.container.querySelector('form')
        
        fireEvent.change(titleInput, {
            target: { value: 'testing title' }
        })
        fireEvent.change(authorInput, {
            target: { value: 'testing author' }
        })

        fireEvent.change(urlInput, {
            target: { value: 'testing url' }
        })

        fireEvent.submit(form)

        expect(addBlog.mock.calls.length).toBe(1)
        expect(addBlog.mock.calls[0][0].title).toBe('testing title')
        expect(addBlog.mock.calls[0][0].author).toBe('testing author')
        expect(addBlog.mock.calls[0][0].url).toBe('testing url')
    })
})

