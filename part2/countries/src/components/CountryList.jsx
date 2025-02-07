const CountryList = ({countries,handleCountrySelect}) =>{
    if(countries.length> 10){
        return(
            <div>
                Too many matches, specifiy another filter
            </div>
        )
    }else{
        return(
            countries.map(c => <li key={c.name.official}>{c.name.common} <button type="button" onClick={() => handleCountrySelect(c)}>Detail</button></li>)
        )
    }

}
export default CountryList