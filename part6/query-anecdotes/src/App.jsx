import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { updateAnecdote, getAnecdotes } from './services/requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(
                ['anecdotes'],
                anecdotes.map((anecdote) =>
                    anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
                )
            )
            dispatch({ type: 'SET', payload: `'${updatedAnecdote.content}' voted` })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
        },
    })

    const { isPending, isError, data } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1,
    })

    if (isPending) {
        return <div>loading data...</div>
    }

    if (isError) {
        return <div>anecdote app is not available due to problems in server</div>
    }

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {data.map((anecdote) => (
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

export default App
