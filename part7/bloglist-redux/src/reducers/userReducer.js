import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { setNotification, clearNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return {}
        },
    },
})

export default userSlice.reducer
export const { setUser, removeUser } = userSlice.actions

export const loginUser = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        blogsService.setToken(user.token)
        dispatch(setUser(user))
        dispatch(setNotification({ message: `User ${user.name} successfully logged in` }))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
        setTimeout(() => {
            window.localStorage.removeItem('loggedUser')
            dispatch(removeUser())
            blogsService.setToken(null)
        }, 3600000)
    }
}
