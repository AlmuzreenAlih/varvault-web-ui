import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import PrivateRoutes from './utils/PrivateRoutes'
import Dashboard from './pages/Dashboard/Dashboard'
import VariablesPage from './pages/VariablesPage/VariablesPage'
import TokensPage from './pages/TokensPage/TokensPage'
import LogsPage from './pages/LogsPage/LogsPage'
import Loading from './pages/Loading/Loading'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/variables' element={<VariablesPage />} />
            <Route path='/tokens' element={<TokensPage />} />
            <Route path='/logs' element={<LogsPage />} />
            <Route path='/loading' element={<Loading />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
)  
}

export default App
