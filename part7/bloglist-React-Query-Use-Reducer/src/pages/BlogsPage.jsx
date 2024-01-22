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

    if (isLoading) {
        return <div>loading data...</div>
    }

    return (
        <div className="mx-3 space-y-2 mt-2 ">
            <h2 className="text-4xl text-center">Blogs</h2>
            <Togglable buttonLabel="new blog">
                <BlogForm createBlog={createBlog} />
            </Togglable>
            <div className="pt-8 flex flex-wrap justify-center ">
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <Link
                            key={blog.id}
                            className="shadow-2xl my-2 border rounded-md border-indigo-200  p-1 hover:bg-indigo-900 text-center w-2/3 hover:transition hover:scale-105 hover:-translate-y-1 delay-75 duration-200"
                            to={`blogs/${blog.id}`}
                        >
                            {blog.title} {blog.author}
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default BlogsPage
