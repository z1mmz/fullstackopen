const Filter = ({handleSearchNameChange,searchName}) =>{
    return(
    <div>
        find countries: <input onChange={handleSearchNameChange} value={searchName}/>
    </div>
    )

}
export default Filter