import { useState,useEffect  } from 'react'
import axios from 'axios'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneList from './components/PhoneList'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchNameName] = useState('')
  const [showAll, setShowAll] = useState(true)

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
      const newId = persons.reduce((id,persons) =>{return persons.id > id ? Number(persons.id) : Number(id) },0 ) +1
      personService.create({id:newId.toString(), name:newName,number:newPhone}).then(
        setPersons(persons.concat({id:newId,name:newName,number:newPhone})))

    }
    setNewName('')
    setNewPhone('')
  }
  useEffect(() => {
    console.log('effect')
    personService.getAll().then(data => {
        console.log(data)
        setPersons(data)
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