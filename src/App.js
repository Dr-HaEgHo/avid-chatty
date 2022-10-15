import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Home from './pages/Home'
import "../src/App.css"

const App = () => {
  return (
      <div className='App'>
            <Routes>
          <Route path='/' element={<Home/> } />
          <Route path='/sign-up' element={<Signup/> } />
    </Routes>
    </div>
  )
}

export default App