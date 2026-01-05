import { useState ,useEffect} from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    const [token, setToken] = useState(null)

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
        return resources
    }

    useEffect(() => {
        getAll()
    }, [baseUrl])

    const create = async newObj => {
        const config = {
            headers: { authorization: token }
        }
        const resp = await axios.post(baseUrl, newObj, config)
        getAll()
        return resp.data
    }


    const service = {
        create,getAll,setToken
    }

    return [resources,service]
}