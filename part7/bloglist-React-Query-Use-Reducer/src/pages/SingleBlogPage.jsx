import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import blogsService from '../services/blogs'
import NotificationContext from '../context/NotificationContext'
import UserContext from '../context/UserContext'

const SingleBlogPage = () => {
    const [content, setContent] = useState('')
    const queryClient = useQueryClient()
    const blogs = queryClient.getQueryData(['blogs'])
    const navigate = useNavigate()

    const [user, userDispatch] = useContext(UserContext)
    const [notification, notificationDispatch] = useContext(NotificationContext)

    const { data, isLoading } = useQuery({
        queryKey: ['comments'],
        queryFn: () => blogsService.getComments(id),
        refetchOnWindowFocus: false,
    })

    const comments = data

    const newCommentMutation = useMutation({
        mutationFn: blogsService.createComment,
        onSuccess: (comment) => {
            const comments = queryClient.getQueryData(['comments'])
            queryClient.setQueryData(['comments'], comments.concat(comment))
        },
    })

    const updateBlogMutation = useMutation({
        mutationFn: blogsService.update,
        onSuccess: ({ blogToUpdate, updatedBlog }) => {
            updatedBlog.user = blogToUpdate.user
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
            )
        },
    })

    const deleteBlogMutation = useMutation({
        mutationFn: blogsService.remove,
        onSuccess: (id) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blogs.filter((b) => b.id !== id)
            )
        },
    })

    const handleLike = (blog) => {
        const newBlog = {
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes + 1,
            id: blog.id,
            user: blog.user,
        }

        try {
            updateBlogMutation.mutate(newBlog)
        } catch (error) {
            notificationDispatch({ type: 'SET', payload: { error: error.message } })
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' })
            }, 5000)
        }
    }

    const handleRemove = (blog) => {
        if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {
            try {
                deleteBlogMutation.mutate(blog.id)
                navigate('/')
                notificationDispatch({
                    type: 'SET',
                    payload: {
                        message: `Blog ${blog.title} by ${blog.author} successfully deleted`,
                    },
                })
                setTimeout(() => {
                    notificationDispatch({ type: 'CLEAR' })
                }, 5000)
            } catch (error) {
                notificationDispatch({ type: 'SET', payload: { error: error.message } })
                setTimeout(() => {
                    notificationDispatch({ type: 'CLEAR' })
                }, 5000)
            }
        }
    }

    const id = useParams().id

    const handleSubmit = (event) => {
        try {
            event.preventDefault()
            newCommentMutation.mutate({ id, content })
            notificationDispatch({
                type: 'SET',
                payload: {
                    message: `comment ${content} added`,
                },
            })
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' })
            }, 5000)
            setContent('')
        } catch (error) {
            notificationDispatch({ type: 'SET', payload: { error: error.message } })
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' })
            }, 5000)
        }
    }

    useEffect(() => {
        if (!blogs) navigate('/')
    }, [])

    if (!blogs || !comments) return null

    const blogToDisplay = blogs.find((blog) => blog.id === id)

    if (isLoading) return null

    return (
        <div>
            <h2>
                {blogToDisplay.title} by {blogToDisplay.author}
            </h2>
            <a href={blogToDisplay.url}>{blogToDisplay.url}</a>
            <p>
                {blogToDisplay.likes}{' '}
                <button onClick={() => handleLike(blogToDisplay)}>like</button>
            </p>
            <p>added by {blogToDisplay.user.name}</p>
            {user.username === blogToDisplay.user.username ? (
                <button onClick={() => handleRemove(blogToDisplay)}>remove</button>
            ) : null}
            <h3>comments</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={({ target }) => setContent(target.value)}
                    value={content}
                    name="Content"
                />
                <button type="submit">create</button>
            </form>
            {comments
                .filter((comment) => comment.blogId === blogToDisplay.id)
                .map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
        </div>
    )
}

export default SingleBlogPage
