import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState:[],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map(a => (a.id !== id ? a : action.payload))

    },
    setAnecdotes(state,action){
      return action.payload
    }

  }
})

const {createAnecdote, setAnecdotes,updateAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
  return async (dispatch) =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const appendAnecdote = (anecdote) =>{
  return async (dispatch) =>{
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}
export const voteAnecdote = (anecdote) =>{
  return async (dispatch) =>{
  const updatedAnecdote = await anecdoteService.vote(anecdote) 
  dispatch(updateAnecdote(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer