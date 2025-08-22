import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) =>{
  token = `Bearer ${newToken}`
  console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newItem) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newItem, config)
  return response.data

}
const updateBlog = (id, newObject) => {
  const config = {
    headers: {Authorization: token}
  }
  const request = axios.put(`${ baseUrl }/${id}`, newObject,config)
  return request.then(response => response.data)
}

export default {getAll, createBlog, updateBlog, setToken}