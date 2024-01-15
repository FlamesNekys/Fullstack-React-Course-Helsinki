import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Matti Luukkainen',
        url: 'none',
        likes: 100,
        user: {
            name: 'mluukkai',
        },
    }

    const mockHandler = jest.fn()

    let container

    beforeEach(() => {
        container = render(<Blog blog={blog} handleLike={mockHandler} />).container
    })

    test('renders title and author', () => {
        screen.getByText('Component testing is done with react-testing-library Matti Luukkainen')
    })

    test('does not render url and likes at start', () => {
        const url = container.querySelector('#url')
        const likes = container.querySelector('#likes')

        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    test('render url and likes after button is clicked', async () => {
        const user = userEvent.setup()

        const viewButton = container.querySelector('#view')
        await user.click(viewButton)

        const url = container.querySelector('#url')
        const likes = container.querySelector('#likes')

        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })

    test('event handler is called twice', async () => {
        const user = userEvent.setup()

        const viewButton = container.querySelector('#view')
        await user.click(viewButton)

        const likeButton = container.querySelector('#likeButton')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
