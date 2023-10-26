import { useState } from 'react'
import './App.css'
import { useSocket } from './useSocket'

function App() {
  const [count, setCount] = useState(0)
  const { handleVote } = useSocket()

  return (
    <>
        {[1,2,3,5,8].map((item, index) => {
          return (
        <button key={index} onClick={() => handleVote(item)}>
          {item}
        </button>
          )
        })}
    </>
  )
}

export default App
