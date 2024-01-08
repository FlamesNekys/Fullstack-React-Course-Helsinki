import PropTypes from 'prop-types'

const Anecdote = ({ anecdote }) => {
    const margin = {
        marginBottom: 15,
    }

    return (
        <div>
            <h2>
                {anecdote.content} by {anecdote.author}
            </h2>
            <div style={margin}>has {anecdote.votes} votes</div>
            {anecdote.info ? (
                <div style={margin}>
                    for mor info see <a href={anecdote.info}>{anecdote.info}</a>
                </div>
            ) : null}
        </div>
    )
}

Anecdote.propTypes = {
    anecdote: PropTypes.object,
}

export default Anecdote
