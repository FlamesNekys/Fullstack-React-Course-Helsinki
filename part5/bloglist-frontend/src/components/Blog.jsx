import { useState } from 'react'

const Blog = ({ blog }) => {
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
                    <div>{blog.likes}</div>
                    <div>{blog.user.name}</div>
                </div>
            )}
        </div>
    )
}

export default Blog
