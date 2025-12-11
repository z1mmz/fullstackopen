import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification,clearNotification } from '../reducers/notificationReducer'

let timer
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if(filter === '') {
            return anecdotes.slice().sort((a,b) => b.votes - a.votes)
        }else{
            return anecdotes.slice().sort((a,b) => b.votes - a.votes).filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        ) 
        }
    })
    const vote = (anecdote) => {
        clearTimeout(timer)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
         timer = setTimeout(() => {
            dispatch(clearNotification(''))
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div >
    )
}
export default AnecdoteList