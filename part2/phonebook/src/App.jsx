import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneList from './components/PhoneList'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
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
      setPersons(persons.concat({name:newName,number:newPhone}))
      console.log(persons)
    }
  }

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