import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Home from './pages/Home'

const App = () => {
  return (
      <Routes>
          <Route path='/' element={<Home/> } />
          <Route path='/sign-up' element={<Signup/> } />
    </Routes>
  )
}

export default App