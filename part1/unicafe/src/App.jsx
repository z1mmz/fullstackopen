import { useState } from 'react'

const StatisticLine = (props) => {
  return(
  <tr>
  <td>{props.name}</td> <td>{props.value}</td>
  </tr>
  )
}

const Statistics = ({counts,avg,pctPos,total}) =>{
  if(total>0){
    // console.log(counts);
    const countsDisplay = Object.keys(counts).map((key)=> <StatisticLine key={key} name={key} value={counts[key]}/>)
    console.log(countsDisplay)
    return(
      <table>
        {countsDisplay}
        <StatisticLine name={"average"} value={avg()}/>
        <StatisticLine name={"positive"} value={pctPos()*100 + "%"}/>
      </table>
    )
  }else{
    return(
    <div>
      <p>No feedback given</p>
    </div>
    )
  }
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
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
      <Button onClick={() => handleGood()} text={"bad"}/>
      <Button onClick={() => handleNeutral()} text={"neutral"}/>
      <Button onClick={() => handleBad()} text={"bad"}/>
      <h1>Statistics</h1>
     <Statistics counts={counts} avg={() => calculateAVG()} pctPos={() => calculatePos()} total={total}/>
    </div>
  )
}

export default App