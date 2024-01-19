import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../context/NotificationContext'
import blogsService from '../services/blogs'
import { Link } from 'react-router-dom'

const BlogsPage = () => {
    const [user, userDispatch] = useContext(UserContext)

    const queryClient = useQueryClient()

    const [notification, notificationDispatch] = useContext(NotificationContext)

    const { data, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogsService.getAll,
        refetchOnWindowFocus: false,
    })

    const newBlogMutation = useMutation({
        mutationFn: blogsService.create,
        onSuccess: (newBlog) => {
            newBlog.user = user
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
        },
    })

    const blogs = data

    const createBlog = (blog) => {
        try {
            newBlogMutation.mutate(blog)
            notificationDispatch({
                type: 'SET',
                payload: {
                    message: `a new blog ${blog.title} by ${blog.author} added`,
                },
            })
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' })
            }, 5000)
        } catch (error) {
            notificationDispatch({ type: 'SET', payload: { error: error.response.data.error } })
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' })
            }, 5000)
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: '1px solid black',
        marginBottom: 5,
    }

    if (isLoading) {
        return <div>loading data...</div>
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Togglable buttonLabel="new blog">
                <BlogForm createBlog={createBlog} />
            </Togglable>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <div style={blogStyle} key={blog.id}>
                        <Link to={`blogs/${blog.id}`}>
                            {blog.title} {blog.author}
                        </Link>
                    </div>
                ))}
        </div>
    )
}

export default BlogsPage
