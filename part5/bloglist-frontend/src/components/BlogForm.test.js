import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
    test('calls onSubmit with right details', async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        const { container } = render(<BlogForm createBlog={createBlog} />)

        const title = container.querySelector('#title')
        const author = container.querySelector('#author')
        const url = container.querySelector('#url')
        const sendButton = screen.getByText('Create')

        await user.type(title, 'test title')
        await user.type(author, 'test author')
        await user.type(url, 'test url')
        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('test title')
        expect(createBlog.mock.calls[0][0].author).toBe('test author')
        expect(createBlog.mock.calls[0][0].url).toBe('test url')
    })
})
