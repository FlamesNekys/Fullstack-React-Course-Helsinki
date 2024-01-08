import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Anecdotes = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map((anecdote) => (
                <li key={anecdote.id}>
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>
            ))}
        </ul>
    </div>
)

Anecdotes.propTypes = {
    anecdotes: PropTypes.array,
}

export default Anecdotes
