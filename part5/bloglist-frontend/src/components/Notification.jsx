import React from 'react'

const Notification = ({ message }) => {
    return !message ? null : (
        <div
            style={{
                border: 'green 2px solid',
                backgroundColor: 'lightgrey',
                color: 'green',
                fontSize: 20,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                marginBottom: 15,
            }}
        >
            {message}
        </div>
    )
}

export default Notification
