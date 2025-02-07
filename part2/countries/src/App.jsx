import { useState,useEffect  } from 'react'
import countriesService from "./services/countriesService"
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'
import weatherService from './services/weatherService'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName,setSearchName] = useState("")
  const [showAll,setShowAll] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearchNameChange = (event) =>{
    setSearchName(event.target.value)
    if (event.target.value != ""){
      setShowAll(false)
      const filteredCountries = countries.filter(countries => countries.name.common.toLowerCase().match(`${event.target.value .toLowerCase()}`) )
    
      if(filteredCountries.length == 1 ){
        setSelectedCountry(filteredCountries[0])
      }else{
        setSelectedCountry(null)
      }
  }else{
    setShowAll(True)
  }
  }
  const handleCountrySelect = (c) =>{
    setSelectedCountry(c)
    console.log(c)
  }
  useEffect(() => {
    countriesService.getAll().then((data) =>{
      console.log(data)
      setCountries(data)
    })

  },[])

  
  const countriesToDisplay = showAll 
    ? countries 
    : countries.filter(countries => countries.name.common.toLowerCase().match(`${searchName.toLowerCase()}`) )

  return (
   <div>
      <Filter handleSearchNameChange={handleSearchNameChange} searchName={searchName}></Filter>
      {selectedCountry ? <CountryDetail country={selectedCountry}/>:<CountryList handleCountrySelect={handleCountrySelect} countries={countriesToDisplay}/>}
   </div>
  )
}

export default App
