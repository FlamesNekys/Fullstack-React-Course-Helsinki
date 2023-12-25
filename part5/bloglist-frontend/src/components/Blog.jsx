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
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
            </div>
            {!visible ? (
                <button onClick={toggleVisibility}>view</button>
            ) : (
                <div>
                    <button onClick={toggleVisibility}>hide</button>
                    <div>{blog.url}</div>
                    <div>
                        {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
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
