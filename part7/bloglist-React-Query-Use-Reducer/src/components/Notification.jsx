import React, { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const Notification = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)

    if (!notification) return null

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
