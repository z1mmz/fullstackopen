import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.anecdoteText.value))
    }

    return (
        <div>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdoteText'/>
                </div>
                <button type='submit' >create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm