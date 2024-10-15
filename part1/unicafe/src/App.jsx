import { useState } from 'react'

const Statistics = ({counts,avg,pctPos,total}) =>{
  console.log(counts);
  const countsDisplay = Object.keys(counts).map((keys)=>{ return <p>{keys} {counts[keys]}</p>})
  console.log(countsDisplay)
  if(total>0){
    return(
      <div>
        {countsDisplay}
        <p>average {avg()}</p>
        <p>positive {pctPos()*100}%</p>
      </div>
    )
  }else{
    return(
    <div>
      <p>No feedback given</p>
    </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average,setAverage] = useState(0)

  const counts = {"good":good,"neutral":neutral,"bad":bad}

  const calculatePos = () => {
    if (total>0){
      return good/total
    }else{
      return 0
    }
  }
  const calculateAVG = () =>{
    if(total){
      return (good - bad)/total
    }else{
      return 0
    }
  }

  const handleGood = () =>{
    const updatedGood = good+1;
    setGood(updatedGood);
    const newTotal = updatedGood + neutral + bad
    setTotal(newTotal);
  }
  const handleNeutral = () =>{
    const updatedNeutral= neutral+1;
    setNeutral(updatedNeutral);
    const newTotal = updatedNeutral + good + bad;
    setTotal(newTotal);
  }
  const handleBad = () =>{
    const updatedBad = bad+1;
    setBad(updatedBad);
    const newTotal = neutral + good + updatedBad;
    setTotal(newTotal);
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => handleGood()}>good</button>
      <button onClick={() => handleNeutral()}>neutral</button>
      <button onClick={() => handleBad()}>bad</button>
      <h1>Statistics</h1>
     <Statistics counts={counts} avg={() => calculateAVG()} pctPos={() => calculatePos()} total={total}/>
    </div>
  )
}

export default App