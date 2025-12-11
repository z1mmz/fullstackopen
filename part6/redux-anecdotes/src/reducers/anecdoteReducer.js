import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState:[],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
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

const {createAnecdote, setAnecdotes} = anecdoteSlice.actions

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


export const {voteAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer