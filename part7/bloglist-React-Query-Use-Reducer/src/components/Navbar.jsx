import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [user, userDispatch] = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-3 px-2 flex justify-between border-b-2 border-b-indigo-400 mb-3 shadow-xl">
            <div className="space-x-3">
                <strong>{user.name} logged in</strong>
                <button
                    className="hover:underline"
                    onClick={() => {
                        window.localStorage.removeItem('loggedUser')
                        userDispatch({ type: 'CLEAR' })
                        navigate('/login')
                    }}
                >
                    Log out
                </button>
            </div>
            <div className="space-x-3">
                <Link className="hover:underline" to="/">
                    blogs
                </Link>
                <Link className="hover:underline" to="/users">
                    users
                </Link>
            </div>
        </div>
    )
}

export default Navbar
