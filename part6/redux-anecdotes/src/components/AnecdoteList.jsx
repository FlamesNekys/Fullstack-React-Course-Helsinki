import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    )
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`You voted for '${anecdote.content}'`))
    }

    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote)}>vote</button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AnecdoteList
