const Filter = ({handleSearchChange,searchName }) => {
    return (
            <div>
                Search name: <input onChange={handleSearchChange} value={searchName}></input>
            </div>
        )
    }
export default Filter