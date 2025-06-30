import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext';
import { FaCaretDown } from "react-icons/fa6";
import axios from 'axios';
import { authDatacontext } from '../context/AuthContext';
function Nav() {
  let {userData,setuserData,notesData,setnotesData} = useContext(userDataContext) 
  const [showDropdown,setDropDown] = useState(false)
  const navigate = useNavigate();
  let {serverURL} = useContext(authDatacontext)

  const handleSignOut = async () => {
    let result = await axios.get(serverURL+'/api/auth/signout', {
      withCredentials: true
    });
    setuserData(null);
    setnotesData([]);
    // Add your sign out logic here (e.g., API call, redirect)
    navigate('/login');
    console.log("Sign out successful:", result.data);
  };


  return (
    <div className='flex flex-row items-center justify-between gap-4 h-[78px] w-full bg-[blue] shadow-lg'>
      <div className='flex justify-start items-center px-[30px]'>
        <h1 className='min-text-[15px] text-white lg:text-[25px]'>CollabNote</h1>
      </div>
      <div className='flex justify-center items-center gap-[5px] text-white min-text-[10px] font-semibold lg:gap-[20px] text-[20px]'>
          <button className='border-none outline-none' onClick={()=>navigate('/')}>Home</button>
          <button className='border-none outline-none' onClick={()=>navigate('/view')}>View</button>
      </div>
      <div className='flex items-center gap-4 justify-end lg:px-[30px]'>
        <button className="flex justify-center items-center bg-white text-blue-700 font-semibold px-4 py-1 rounded hover:bg-blue-100 transition gap-[10px]"onClick={()=>handleSignOut()} >Sign out</button>
      </div>
    </div>
  )
}

export default Nav