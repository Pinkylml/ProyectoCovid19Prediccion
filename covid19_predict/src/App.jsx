import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PredictionForm from './component/form'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PredictionForm />
    </>
  )
}

export default App
