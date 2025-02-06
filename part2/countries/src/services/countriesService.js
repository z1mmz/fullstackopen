import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
  }
const getDetail = (name) => {
    const request = axios.get(`${baseUrl}/api/name/${name}`)
    return request.then(response => response.data)
  }
 
  

export default { 
    getAll, 
    getDetail
}
 