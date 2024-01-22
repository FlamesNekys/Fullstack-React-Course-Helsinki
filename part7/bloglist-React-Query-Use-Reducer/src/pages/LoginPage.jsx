import React, { useContext, useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import UserContext from '../context/UserContext'
import NotificationContext from '../context/NotificationContext'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [notification, notificationDispatch] = useContext(NotificationContext)
    const [user, userDispatch] = useContext(UserContext)

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
            navigate('/')
        } catch (exception) {
            notificationDispatch({ type: 'SET', payload: { error: 'Wrong username or password' } })
            setTimeout(() => {
                notificationDispatch({ type: 'CLEAR' })
            }, 5000)
        }
    }

    return (
        <div>
            <h2 className="text-center text-4xl">Log in to application</h2>
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

export default LoginPage
