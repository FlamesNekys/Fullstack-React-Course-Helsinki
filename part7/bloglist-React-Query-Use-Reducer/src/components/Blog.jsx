import { useState } from 'react'

const Blog = ({ blog, handleLike, username, removeBlog }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div style={blogStyle} className="blog">
            <div id="title-author"></div>
            {!visible ? (
                <button id="view" onClick={toggleVisibility}>
                    view
                </button>
            ) : (
                <div>
                    <button id="hide" onClick={toggleVisibility}>
                        hide
                    </button>
                    <div id="url">{blog.url}</div>
                    <div id="likes">
                        {blog.likes}{' '}
                        <button id="likeButton" onClick={() => handleLike(blog)}>
                            like
                        </button>
                    </div>
                    <div>{blog.user.name}</div>
                    {username === blog.user.username ? (
                        <button onClick={() => removeBlog(blog)}>remove</button>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default Blog
