import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const handleChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleSubmit = (event) =>{
    event.preventDefault()
    setPersons(persons.concat({name:newName}))
    console.log(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <li key={p.name}>{p.name}</li>)}
    </div>
  )
}

export default App