import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        newNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return ''
        },
    },
})

export const setNotification = (text, time = 5) => {
    return (dispatch) => {
        dispatch(newNotification(text))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export const { newNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
