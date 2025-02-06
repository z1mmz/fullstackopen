const PhoneList = ({personsToShow}) =>{
    return(
        <div>
            {personsToShow.map(p => <li key={p.id}>{p.name}: {p.number}</li>)}
        </div>
    )
}
export default PhoneList