
import './App.css'
import useCountStore from './store'

function App() {
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);
  return (
    <>
      <div>
        hello world
        <h1>Count : {count}</h1>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>

      </div>
    </>
  )
}

export default App
