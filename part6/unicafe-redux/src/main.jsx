import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const App = () => {
  const handleClick = (actionType) =>{
    store.dispatch({ type: actionType})
  }
  return (
    <div>
      <button onClick={() => handleClick("GOOD")}>good</button>
      <button onClick={() => handleClick("OK")}>ok</button>
      <button onClick={() => handleClick("BAD")}>bad</button>
      <button onClick={() => handleClick("RESET")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
