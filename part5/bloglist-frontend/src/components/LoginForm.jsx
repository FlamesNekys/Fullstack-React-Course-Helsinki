import React from 'react'
import Error from './Error'

const LoginForm = ({ errorMessage, handleLogin, username, setUsername, password, setPassword }) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <Error message={errorMessage} />
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginForm
