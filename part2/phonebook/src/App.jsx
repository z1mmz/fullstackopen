import { useState,useEffect  } from 'react'
import axios from 'axios'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneList from './components/PhoneList'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchNameName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

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
    }else if(persons.some((p) => p.name == newName & p.number != newPhone )){
      if(confirm(`${newName} is already added to the phone book, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newPhone }
        personService.update(person.id,changedPerson).then((resp) =>{
          console.log(resp)
          setPersons(persons.map(p => p.id === person.id ? resp : p))
          setMessage(`Updated ${person.name}`)
          setTimeout(()=>{
            setMessage(null)
          },5000)
        }).catch(error => {
          alert('Could not update entry')
        })

      }
    }
    else{
      const newId = persons.reduce((id,persons) =>{return persons.id > id ? Number(persons.id) : Number(id) },0 ) +1
      personService.create({id:newId.toString(), name:newName,number:newPhone}).then(
        setPersons(persons.concat({id:newId,name:newName,number:newPhone})))
        setMessage(`Added ${newName}`)
        setTimeout(()=>{
          setMessage(null)
        },5000)
    }
    setNewName('')
    setNewPhone('')
  }
  const handleDelete = (personToDelete) =>{
    if(confirm(`Delete ${personToDelete.name} : ${personToDelete.number}?`)){
      console.log(`deleting ${personToDelete.id}`)
      personService.remove(personToDelete.id).then((returnedP) =>{
        setPersons(persons.filter(p => p.id != returnedP.id) )
        setMessage(`Removed ${personToDelete.name}`)
        setTimeout(()=>{
          setMessage(null)
        },5000)
      } ).catch(error => {
        alert('Could not delete entry')
      })
    }
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
      <Notification message={message} messageType={messageType} />
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
      <PhoneList personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App