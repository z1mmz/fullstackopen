import { useState,useEffect  } from 'react'
import countriesService from "./services/countriesService"
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setcountry] = useState(null)
  const [searchName,setSearchName] = useState("")
  const [showAll,setShowAll] = useState(true)

  const handleSearchNameChange = (event) =>{
    setSearchName(event.target.value)
    if(event.target.value === ""){
      setShowAll(true)
    }else{
      setShowAll(false)
    }
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
      {countriesToDisplay.length === 1 ? <CountryDetail country={countriesToDisplay[0]}/>:<CountryList countries={countriesToDisplay}/>}
   </div>
  )
}

export default App
