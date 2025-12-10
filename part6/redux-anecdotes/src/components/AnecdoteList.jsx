import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        console.log(anecdotes)
        if(filter === '') {
            return anecdotes.slice().sort((a,b) => b.votes - a.votes)
        }else{
            return anecdotes.slice().sort((a,b) => b.votes - a.votes).filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        ) 
        }
    })

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
                    </div>
                </div>
            ))}
        </div >
    )
}
export default AnecdoteList