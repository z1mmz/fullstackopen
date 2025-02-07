import { useState, useEffect } from 'react'
import weatherService from "../services/weatherService"

const CountryDetail = ({country}) =>{
    console.log(country.languages)
    const [weather,setWeather] = useState(null)

    
    useEffect(() => {
        weatherService.getWeather(country).then((data) =>{
        setWeather(data)
        console.log(data)
        })

    },[])
    return(
        <div>
            <h1>{country.name.common}</h1>
            <div>
                Capital: {country.capital}
            </div>
            <div>
                Area: {country.area}
            </div>
            <h2>Languages</h2>
            <ul>
            {Object.values(country.languages).map((lang,i) => <li key={i}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
            {weather ? <div>
                <h2>Weather</h2>
                <img src={weatherService.getWeatherIcon(weather)}/>
                <div>Temprature: {weather.main.temp} celcius</div>
                <div>Wind: {weather.wind.speed} m/s</div>
            </div> :""}
        </div>
    )

}
export default CountryDetail