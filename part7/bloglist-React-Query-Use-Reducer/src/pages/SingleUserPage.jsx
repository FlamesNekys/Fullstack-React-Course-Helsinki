import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SingleUserPage = () => {
    const queryClient = useQueryClient()
    const users = queryClient.getQueryData(['users'])
    const navigate = useNavigate()

    useEffect(() => {
        if (!users) navigate('/users')
    }, [])

    const id = useParams().id

    if (!users) return null

    const userToDisplay = users.find((user) => user.id === id)

    return (
        <div>
            <h2>{userToDisplay.name}</h2>
            <h3>Added blogs</h3>
            {userToDisplay.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
            ))}
        </div>
    )
}

export default SingleUserPage
