import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
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

    const handleNewBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = {
                title,
                url,
                author,
            }

            const createdBlog = await blogService.create(blog)
            setBlogs(blogs.concat(createdBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            setNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    if (!user) {
        return (
            <LoginForm
                errorMessage={errorMessage}
                handleLogin={handleLogin}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
            />
        )
    }

    return (
        <BlogForm
            author={author}
            blogs={blogs}
            errorMessage={errorMessage}
            handleNewBlog={handleNewBlog}
            notification={notification}
            setAuthor={setAuthor}
            setTitle={setTitle}
            setUrl={setUrl}
            setUser={setUser}
            title={title}
            url={url}
            user={user}
        />
    )
}

export default App
