const PersonForm = ({handleNameChange,handlePhoneChange,handleSubmit,newName,newPhone}) => {
return(
    <form>
        <div>
          Name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          Number: <input onChange={handlePhoneChange} value={newPhone}/>
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
      </form>
    )
}
export default PersonForm