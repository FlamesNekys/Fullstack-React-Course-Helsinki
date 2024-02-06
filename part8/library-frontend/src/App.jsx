import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        const token = localStorage.getItem('library-user-token')
        if (token) setToken(token)
    }, [])

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token ? (
                    <div>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={logout}>logout</button>
                        <button onClick={() => setPage('recommend')}>recommend</button>
                    </div>
                ) : (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <LoginForm
                setError={notify}
                show={page === 'login'}
                setToken={setToken}
                setPage={setPage}
            />

            <Notify errorMessage={errorMessage} />

            <Authors setError={notify} show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook setError={notify} show={page === 'add'} />

            <Recommend show={page === 'recommend'} />
        </div>
    )
}

export default App
