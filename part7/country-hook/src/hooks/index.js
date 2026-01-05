import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [data, setData] = useState(null)
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
    const found = data !== null
    useEffect(() => {
        if (!name) {
            setData(null);
            return;
        }

        const fetchCountry = async (name) => {
            try {
                const response = await axios.get(`${baseUrl}/name/${name}`)
                setData(response.data)
            } catch (error) {
                setData(null)
            }
        }
        if (name) {
            fetchCountry(name)
        }
    }, [name])
    return {data,found}
}