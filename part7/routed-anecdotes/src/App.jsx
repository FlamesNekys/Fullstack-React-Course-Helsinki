import { useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import AnecdotesPage from './pages/AnecdotesPage'
import Navbar from './components/Navbar'
import About from './pages/AboutPage'
import AnecdoteForm from './pages/AnecdoteFormPage'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1,
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2,
        },
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`a new anecdote '${anecdote.content}' created!`)
        setTimeout(() => {
            setNotification('')
        }, 5000)
    }

    // const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

    // const vote = (id) => {
    //     const anecdote = anecdoteById(id)

    //     const voted = {
    //         ...anecdote,
    //         votes: anecdote.votes + 1,
    //     }

    //     setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
    // }

    const match = useMatch('/anecdotes/:id')
    const anecdote = match ? anecdotes.find((anecdote) => anecdote.id === +match.params.id) : null

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Navbar />
            <div style={{ marginTop: 10 }}>{notification || null}</div>
            <Routes>
                <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
                <Route path="/" element={<AnecdotesPage anecdotes={anecdotes} />} />
                <Route path="/about" element={<About />} />
                <Route path="/create" element={<AnecdoteForm addNew={addNew} />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
