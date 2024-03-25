import { useState } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {process.env.KEY}
      < LoginPage/>
    </>
  )     
}

export default App
