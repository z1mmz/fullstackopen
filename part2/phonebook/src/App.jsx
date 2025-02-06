import { useState,useEffect  } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneList from './components/PhoneList'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchNameName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const serverURL = "https://super-space-meme-qgvwq7xwrqc95gw-3001.app.github.dev"
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) =>{
    setNewPhone(event.target.value)
  }
  const handleSearchChange = (event) =>{
    setSearchNameName(event.target.value)
    if (event.target.value != ""){
      setShowAll(false)
    }else{
      setShowAll(true)
    }
  }
  const personsToShow = showAll 
    ? persons 
    : persons.filter(persons => persons.name.toLowerCase().match(`${searchName.toLowerCase()}`) )

  const handleSubmit = (event) =>{
    event.preventDefault()

    if(persons.some((p) => p.name == newName & p.number == newPhone )){
      alert(`${newName} ${newPhone} is already added to the phone book`)
    }else{
      axios
        .post(`${serverURL}/persons`,{name:newName,number:newPhone}).then(response => {
          console.log(response)
        })
      setPersons(persons.concat({name:newName,number:newPhone}))
      console.log(persons)
    }
    setNewName('')
    setNewPhone('')
  }
  useEffect(() => {
    console.log('effect')
    axios
      .get(`${serverURL}/persons`)
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter handleSearchChange={handleSearchChange} searchName={searchName} />
      </div>
      <h2>Add a new entry</h2>
      <PersonForm handleNameChange={handleNameChange} 
                  handlePhoneChange={handlePhoneChange}
                  handleSubmit={handleSubmit}
                  newName={newName}
                  newPhone={newPhone}/>
      <h2>Numbers</h2>
      <PhoneList personsToShow={personsToShow}/>
    </div>
  )
}

export default App