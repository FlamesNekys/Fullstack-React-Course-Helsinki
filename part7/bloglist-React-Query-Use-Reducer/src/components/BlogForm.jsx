import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = (event) => {
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
            <div className="space-y-4">
                <div>
                    <input
                        placeholder="title"
                        type="text"
                        value={title}
                        id="title-form"
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="author"
                        type="text"
                        value={author}
                        id="author-form"
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="url"
                        type="text"
                        value={url}
                        id="url-form"
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
            </div>

            <button className="hover:underline mt-5" type="submit">
                create
            </button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm
