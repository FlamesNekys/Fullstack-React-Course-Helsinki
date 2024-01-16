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

    if (notification.message) return <div style={messageStyle}>{notification.message}</div>
    if (notification.error) return <div style={errorStyle}>{notification.error}</div>
}

export default Notification
