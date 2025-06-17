import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login2 from './pages/Login2'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { userDataContext } from './context/UserContext'

function App() {
  let {userData, setuserData} = useContext(userDataContext)

  return (
   
      <Routes>
        <Route path="/" element={userData?<Home />:<Navigate to ="/signin"/>} />
        <Route path="/signup" element={userData?<Navigate to='/'/>:<Login2 />} /> 
        <Route path="/signin" element={userData?<Navigate to='/'/>:<Login2 />} />
        {/* Add more routes as needed */}
      </Routes>
    
  )
}

export default App
