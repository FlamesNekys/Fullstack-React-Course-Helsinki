import React, { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const Notification = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)

    if (!notification) return null

    const messageStyle = {
        border: 'green 2px solid',
        backgroundColor: 'lightgrey',
        color: 'green',
        fontSize: 20,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15,
    }

    const errorStyle = {
        border: 'red 2px solid',
        backgroundColor: 'lightgrey',
        color: 'red',
        fontSize: 20,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15,
    }

    if (notification.message)
        return (
            <div className="bg-violet-800 px-3 py-2 border-2 border-emerald-600 w-screen shadow-xl animate-appear">
                {notification.message}
            </div>
        )
    if (notification.error)
        return (
            <div className="bg-violet-800 px-3 py-2 border-2 border-red-700 w-screen shadow-xl animate-appear">
                {notification.error}
            </div>
        )
}

export default Notification
