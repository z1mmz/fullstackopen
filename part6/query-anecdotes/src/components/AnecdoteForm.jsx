import { useContext } from 'react'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import NotificationContext from '../notificationContext'

let timer
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation({
      mutationFn:createAnecdote,
      onSuccess:(newAnecdote) =>{
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdote))
      },
      onError: (error) =>{
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `Error: ${error}` })
        clearTimeout(timer)
        timer = setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000);
      }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content,votes:0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
