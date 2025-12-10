import { filterChange } from '../reducers/filterReducer' 
import { useDispatch } from 'react-redux'
const AnecdoteFilter = () => {
    const dispatch = useDispatch()
     const Filter = (event) => {
            event.preventDefault()
            console.log(event.target.value)
            dispatch(filterChange(event.target.value ))
        }

    return (
        <div>
            <input
                type="text"
                placeholder="Filter anecdotes" onChange={(e) => {Filter(e)}} />
        </div >
    )
}
export default AnecdoteFilter