import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const newAnecdote = await anecdoteService.createNew(event.target.anecdoteText.value)
        dispatch(createAnecdote(newAnecdote))
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