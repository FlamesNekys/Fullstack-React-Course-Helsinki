import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const update = async (blogToUpdate) => {
    const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate)
    const updatedBlog = response.data
    return { blogToUpdate, updatedBlog }
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    await axios.delete(`${baseUrl}/${id}`, config)

    return id
}

const getComments = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data
}

const createComment = async (comment) => {
    const response = await axios.post(`${baseUrl}/${comment.id}/comments`, comment)
    return response.data
}

export default { getAll, setToken, create, update, remove, getComments, createComment }
