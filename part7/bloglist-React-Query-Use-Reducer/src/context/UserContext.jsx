import { createContext, useReducer } from 'react'

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return {}
        default:
            return state
    }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, userDispatch] = useReducer(userReducer, {})

    return <UserContext.Provider value={[user, userDispatch]}>{children}</UserContext.Provider>
}

export default UserContext
