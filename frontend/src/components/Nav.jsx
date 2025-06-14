import React from 'react'
import { useNavigate } from 'react-router-dom'
function Nav() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row items-center justify-between gap-4 h-[78px] w-full bg-[blue] shadow-lg'>
      <div className='flex justify-start items-center px-[30px]'>
        <h1 className='text-white text-[25px]'>CollabNote</h1>
      </div>
      <div className='flex items-center gap-4 px-[30px] justify-end'>
        <button className="bg-white text-blue-700 font-semibold px-4 py-1 rounded hover:bg-blue-100 transition" onClick={() => navigate('/signin')}>Register</button>
        {/* <button className="bg-yellow-400 text-blue-900 font-semibold px-4 py-1 rounded hover:bg-yellow-300 transition" onClick={() => navigate('/signup')}>Sign Up</button> */}
      </div>
    </div>
  )
}

export default Nav