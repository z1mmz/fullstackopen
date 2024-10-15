import { useState } from 'react'

const Statistics = ({name,count}) =>{
  
  return(
    <div>
      <p>{name} {count}</p>

    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average,setAverage] = useState(0)

  const handleGood = () =>{
 
    const updatedGood = good+1;
    setGood(updatedGood);
    const newTotal = updatedGood + neutral + bad
    setTotal(newTotal);
    const newAverage = (updatedGood - bad)/newTotal
    setAverage(newAverage)
  }
  const handleNeutral = () =>{
    const updatedNeutral= neutral+1;
    setNeutral(updatedNeutral);

    const newTotal = updatedNeutral + good + bad;
    setTotal(newTotal);
    const newAverage = (good - bad)/newTotal
    setAverage(newAverage)
  }
  const handleBad = () =>{
    const updatedBad = bad+1;
    setBad(updatedBad);
    const newTotal = neutral + good + updatedBad;
    setTotal(newTotal);
    const newAverage = (good - updatedBad)/newTotal
    setAverage(newAverage)
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => handleGood()}>good</button>
      <button onClick={() => handleNeutral()}>neutral</button>
      <button onClick={() => handleBad()}>bad</button>
      <h1>Statistics</h1>
      <Statistics name={"good"} count={good}/>
      <Statistics name={"neutral"} count={neutral}/>
      <Statistics name={"bad"} count={bad}/>
      <Statistics name={"total"} count={total}/>
      <Statistics name={"total"} count={total}/>
      <p>{average}</p>
    </div>
  )
}

export default App