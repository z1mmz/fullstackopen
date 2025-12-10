
import { useDispatch } from 'react-redux'
const AnecdoteFilter = () => {
    const dispatch = useDispatch()
     const Filter = (event) => {
            event.preventDefault()
            console.log(event.target.value)
            dispatch({ type: 'SET_FILTER', payload: event.target.value })
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