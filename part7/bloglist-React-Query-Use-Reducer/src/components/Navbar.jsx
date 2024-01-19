import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [user, userDispatch] = useContext(UserContext)

    const padding = {
        padding: 5,
    }

    return (
        <div style={{ backgroundColor: 'lightgrey' }}>
            <Link style={padding} to="/">
                blogs
            </Link>
            <Link style={padding} to="/users">
                users
            </Link>
            <strong style={padding}>{user.name} logged in</strong>
            <button
                style={padding}
                onClick={() => {
                    window.localStorage.removeItem('loggedUser')
                    userDispatch({ type: 'CLEAR' })
                }}
            >
                Log out
            </button>
        </div>
    )
}

export default Navbar
