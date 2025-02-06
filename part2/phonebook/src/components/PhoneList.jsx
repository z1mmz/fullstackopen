const PhoneList = ({personsToShow,handleDelete}) =>{
    return(
        <div>
            {personsToShow.map(p => <li key={p.id}>{p.name}: {p.number} <button onClick={() => handleDelete(p)}> delete </button></li>)}
        </div>
    )
}
export default PhoneList