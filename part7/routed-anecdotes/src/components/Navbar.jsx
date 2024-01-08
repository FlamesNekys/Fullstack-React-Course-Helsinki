import { Link } from 'react-router-dom'

const Navbar = () => {
    const padding = {
        paddingRight: 5,
    }

    return (
        <div>
            <Link style={padding} to="/">
                anecdotes
            </Link>
            <Link style={padding} to="/create">
                create new
            </Link>
            <Link style={padding} to="/about">
                about
            </Link>
        </div>
    )
}

export default Navbar