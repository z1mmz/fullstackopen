import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const AnecdoteDisplay = (props) =>{

  return(
    <div>
      <p>{props.text}</p>
      {props.votes || <p>{props.votes}</p>}
    </div>
  )

}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points,setPoints] =  useState({})

  const getHighestVote =  () => {
    let i = 0;
    Object.keys(points).map((key) => {points[key] > (points[i] || 0) ? i=key : i=i} )
    return i;
  }

  const handleVote = () => {
    const newPoints = {...points}
    newPoints[selected] = (newPoints[selected] || 0) + 1;
    console.log(newPoints)
    setPoints(newPoints)
    
  }
  const getRandAnecdote = () =>{
    const length = anecdotes.length;
    const i = Math.floor(Math.random() * (length) )
    setSelected(i)
  }
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <h1>Anecdote of the day</h1>

      <AnecdoteDisplay text={anecdotes[selected]}/>
      <Button onClick={handleVote} text={"vote"}/> <Button onClick={getRandAnecdote} text={"Next Anecdote"}/>
      <h1>Anecdote with the most votes</h1>
      <AnecdoteDisplay text={anecdotes[getHighestVote()]} votes={points[getHighestVote()]}/>

    </div>
  )
}

export default App