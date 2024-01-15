import React from 'react'

const Error = ({ message }) => {
    return !message ? null : (
        <div
            style={{
                border: 'red 2px solid',
                backgroundColor: 'lightgrey',
                color: 'red',
                fontSize: 20,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                marginBottom: 15,
            }}
            id="error"
        >
            {message}
        </div>
    )
}

export default Error
