import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            const blog = action.payload
            state.push(blog)
        },
        setBlogs(state, action) {
            return action.payload
        },
        changeBlog(state, action) {
            const updatedBlog = action.payload

            return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        },
        removeBlog(state, action) {
            const id = action.payload

            return state.filter((b) => b.id !== id)
        },
    },
})

export const { appendBlog, setBlogs, changeBlog, removeBlog } = blogsSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog, user) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        newBlog.user = user
        dispatch(appendBlog(newBlog))
    }
}

export const likeBlog = (blog, user) => {
    return async (dispatch) => {
        const newBlog = {
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes + 1,
        }

        const updatedBlog = await blogService.update(blog.id, newBlog)
        updatedBlog.user = user
        dispatch(changeBlog(updatedBlog))
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}

export default blogsSlice.reducer
