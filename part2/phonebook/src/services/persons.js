import axios from "axios";

const url = 'http://localhost:3001/persons'

const getAll = () => 
    axios
        .get(url)
        .then(response => response.data)
        .catch(e => console.log(e.message))


const create = newObject => 
    axios
        .post(url, newObject)
        .then(response => response.data)
        .catch(e => console.log(e.message))


const update = (id, newObject) => 
    axios
        .put(`${url}/${id}`, newObject)
        .then(response => response.data)
        .catch(e => console.log(e.message))

const remove = (id) => 
    axios
        .delete(`${url}/${id}`)
        .catch(e => console.log(e.message))


export default {getAll, create, update, remove}