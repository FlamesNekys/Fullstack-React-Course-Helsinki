import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ children, buttonLabel }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button className="hover:underline mt-2" onClick={toggleVisibility}>
                    cancel
                </button>
            </div>
        </div>
    )
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
