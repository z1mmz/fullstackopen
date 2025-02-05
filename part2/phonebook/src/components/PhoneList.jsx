const PhoneList = ({personsToShow}) =>{
    return(
        <div>
            {personsToShow.map(p => <li key={p.name}>{p.name}: {p.number}</li>)}
        </div>
    )
}
export default PhoneList