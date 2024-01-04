import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        update(state, action) {
            const votedAnecdote = action.payload
            const newState = state.map((anecdote) =>
                anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
            )
            return newState
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
    },
})

export const vote = (anecdote) => {
    return async (dispatch, getState) => {
        const anecdotes = getState().anecdotes
        const id = anecdote.id
        const anecdoteToVote = anecdotes.find((a) => a.id === id)
        const changedAnecdote = {
            ...anecdoteToVote,
            votes: anecdoteToVote.votes + 1,
        }
        const votedAnecdote = await anecdoteService.update(changedAnecdote)
        dispatch(update(votedAnecdote))
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.create(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const { update, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
