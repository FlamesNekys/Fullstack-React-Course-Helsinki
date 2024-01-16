import { useState, useEffect, useContext } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import NotificationContext from './context/NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './context/UserContext'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const queryClient = useQueryClient()

    const [notification, notificationDispatch] = useContext(NotificationContext)
    const [user, userDispatch] = useContext(UserContext)

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

    const blogs = data

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userDispatch({ type: 'SET', payload: user })
            blogsService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogsService.setToken(user.token)
            userDispatch({ type: 'SET', payload: user })
            setUsername('')
            setPassword('')
            notificationDispatch({
                type: 'SET',
                payload: { message: `User ${user.name} successfully logged in` },
            })
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' })
            }, 5000)
            setTimeout(() => {
                window.localStorage.removeItem('loggedUser')
                userDispatch({ type: 'CLEAR' })
                blogsService.setToken(null)
            }, 3600000)
        } catch (exception) {
            notificationDispatch({ type: 'SET', payload: { error: 'Wrong username or password' } })
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' })
            }, 5000)
        }
    }

    const createBlog = async (blog) => {
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

    const handleLike = async (blog) => {
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

    const handleRemove = async (blog) => {
        if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {
            try {
                deleteBlogMutation.mutate(blog.id)
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

    if (!user.username) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <LoginForm
                    errorMessage={errorMessage}
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            </div>
        )
    }

    if (isLoading) {
        return <div>loading data...</div>
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification />
            <div>
                <h4>{`${user.name} logged in`}</h4>{' '}
                <button
                    onClick={() => {
                        window.localStorage.removeItem('loggedUser')
                        userDispatch({ type: 'CLEAR' })
                    }}
                >
                    Log out
                </button>
            </div>
            <Togglable buttonLabel="new blog">
                <BlogForm createBlog={createBlog} />
            </Togglable>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={handleLike}
                        username={user.username}
                        removeBlog={handleRemove}
                    />
                ))}
        </div>
    )
}

export default App
