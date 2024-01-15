import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { clearNotification, setNotification } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogsReducer'
import { loginUser, removeUser, setUser } from './reducers/userReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const blogs = useSelector(({ blogs }) => blogs)
    const notification = useSelector(({ notification }) => notification)
    const user = useSelector(({ user }) => user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            dispatch(loginUser(username, password))
            setUsername('')
            setPassword('')
        } catch (error) {
            dispatch(setNotification({ error: 'Wrong username or password' }))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }

    const addBlog = async (blog) => {
        try {
            dispatch(createBlog(blog, user))
            dispatch(
                setNotification({
                    message: `a new blog ${blog.title} by ${blog.author} added`,
                })
            )
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        } catch (error) {
            console.log(error)
            dispatch(setNotification({ error: error.response.data.error }))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }

    const handleLike = async (blog) => {
        try {
            dispatch(likeBlog(blog, user))
        } catch (error) {
            dispatch(setNotification({ error: error.message }))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }

    const handleRemove = async (blog) => {
        if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {
            try {
                dispatch(deleteBlog(blog.id))
                dispatch(
                    setNotification({
                        message: `Blog ${blog.title} by ${blog.author} successfully deleted`,
                    })
                )
                setTimeout(() => {
                    dispatch(clearNotification())
                }, 5000)
            } catch (error) {
                dispatch(setNotification({ error: error.message }))
                setTimeout(() => {
                    dispatch(clearNotification())
                }, 5000)
            }
        }
    }

    if (!user.name) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification notification={notification} />
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification notification={notification} />
            <div>
                <h4>{`${user.name} logged in`}</h4>{' '}
                <button
                    onClick={() => {
                        window.localStorage.removeItem('loggedUser')
                        dispatch(removeUser())
                    }}
                >
                    Log out
                </button>
            </div>
            <Togglable buttonLabel="new blog">
                <BlogForm createBlog={addBlog} />
            </Togglable>
            {[...blogs]
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
