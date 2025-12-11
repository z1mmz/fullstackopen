import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'

import {setAnecdotes} from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  console.log(anecdotesService)
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }),[dispatch,anecdotesService]

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <AnecdoteFilter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
