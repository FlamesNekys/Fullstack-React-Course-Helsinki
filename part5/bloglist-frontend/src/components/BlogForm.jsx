import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) => {
        event.preventDefault()

        const blog = {
            title,
            url,
            author,
        }

        createBlog(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={handleNewBlog}>
            <div>
                title
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm
