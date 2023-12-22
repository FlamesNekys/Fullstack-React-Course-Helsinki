import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
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
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification(`User ${user.name} successfully logged in`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            setTimeout(() => {
                window.localStorage.removeItem('loggedUser')
                setUser(null)
                blogService.setToken(null)
            }, 3600000)
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const createBlog = async (blog) => {
        try {
            const createdBlog = await blogService.create(blog)
            createdBlog.user = user
            setBlogs(blogs.concat(createdBlog))
            setNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    if (!user) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Error message={errorMessage} />
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

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={notification} />
            <Error message={errorMessage} />
            <div>
                <h4>{`${user.name} logged in`}</h4>{' '}
                <button
                    onClick={() => {
                        window.localStorage.removeItem('loggedUser')
                        setUser(null)
                    }}
                >
                    Log out
                </button>
            </div>
            <Togglable buttonLabel="new blog">
                <BlogForm createBlog={createBlog} />
            </Togglable>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
