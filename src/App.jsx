import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path='/' element={<>helloWorld</>} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
)  
}

export default App
