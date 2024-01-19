import { useEffect, useContext } from 'react'
import blogsService from './services/blogs'
import UserContext from './context/UserContext'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import BlogsPage from './pages/BlogsPage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import SingleUserPage from './pages/SingleUserPage'
import SingleBlogPage from './pages/SingleBlogPage'
import Navbar from './components/Navbar'
import Notification from './components/Notification'

const App = () => {
    const [user, userDispatch] = useContext(UserContext)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userDispatch({ type: 'SET', payload: user })
            blogsService.setToken(user.token)
        }
    }, [])

    return (
        <BrowserRouter>
            <Navbar />
            <Notification />
            <Routes>
                <Route
                    path="/"
                    element={user.username ? <BlogsPage /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/login"
                    element={!user.username ? <LoginPage /> : <Navigate replace to="/" />}
                />
                <Route
                    path="/users"
                    element={user.username ? <UsersPage /> : <Navigate replace to="/login" />}
                />
                <Route path="/users/:id" element={<SingleUserPage />} />
                <Route path="/blogs/:id" element={<SingleBlogPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
