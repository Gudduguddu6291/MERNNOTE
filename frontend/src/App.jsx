import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login2 from './pages/Login2'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Login2 />} /> 
        <Route path="/signin" element={<Login2 />} />
        {/* Add more routes as needed */}
      </Routes>
    
  )
}

export default App
