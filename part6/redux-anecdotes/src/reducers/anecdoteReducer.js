import { createSlice } from '@reduxjs/toolkit'




const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}




const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState:[],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push(asObject(anecdote))
    },
    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id == id)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => (a.id !== id ? a : updatedAnecdote))

    },
    setAnecdotes(state,action){
      return action.payload
    }

  }
})

export const {createAnecdote,voteAnecdote,setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer