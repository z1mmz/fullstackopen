import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        dispatch(appendAnecdote(event.target.anecdoteText.value))
        event.target.anecdoteText.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
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