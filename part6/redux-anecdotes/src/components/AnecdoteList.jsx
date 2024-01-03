import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    )
    const dispatch = useDispatch()

    const handleVote = (id, content) => {
        dispatch(vote(id))
        dispatch(setNotification(`You voted for '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
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
                            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AnecdoteList
