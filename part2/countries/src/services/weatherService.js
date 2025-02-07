
import axios from 'axios'
const apikey = import.meta.env.VITE_WEATHER_KEY

const getWeather = (c) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${c.latlng[0]}&lon=${c.latlng[1]}&units=metric&appid=${apikey}`
    console.log(url)
    const request = axios.get(url)
    return request.then(response => response.data)
  }
const getWeatherIcon = (weather) => {
    return  `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    
  }

 
  

export default { 
    getWeather,
    getWeatherIcon
}