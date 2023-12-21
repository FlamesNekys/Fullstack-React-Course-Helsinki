import React from 'react'
import Blog from './Blog'
import Notification from './Notification'
import Error from './Error'

const BlogForm = ({
    notification,
    errorMessage,
    user,
    setUser,
    handleNewBlog,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
    blogs,
}) => {
    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={notification} />
            <Error message={errorMessage} />
            <div>
                <h4>{`${user.name} logged in`}</h4>{' '}
                <button
                    onClick={() => {
                        window.localStorage.removeItem('loggedUser')
                        setUser(null)
                    }}
                >
                    Log out
                </button>
            </div>
            <h2>Create new blog</h2>
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
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default BlogForm
