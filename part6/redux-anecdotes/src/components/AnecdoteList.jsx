import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


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
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
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