const CountryDetail = ({country}) =>{
    console.log(country.languages)

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
        </div>
    )

}
export default CountryDetail