const CountryList = ({countries}) =>{
    if(countries.length> 10){
        return(
            <div>
                Too many matches, specifiy another filter
            </div>
        )
    }else{
        return(
            countries.map(c => <li key={c.name.official}>{c.name.common}</li>)
        )
    }

}
export default CountryList