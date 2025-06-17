import React, { createContext, useEffect, useState } from 'react'
import { authDatacontext } from './AuthContext';
import { useContext } from 'react';
import axios from 'axios';



export const userDataContext = createContext();

function UserContext ({children}) {

let [userData,setuserData] = useState(null);
let {serverURL} = useContext(authDatacontext);

const getCurrentUser=async()=>{
    try {
        let result = await axios.get(serverURL+"/api/user/currentuser",
            {withCredentials:true})
        console.log(result);
        setuserData(result.data);
       
    } 
    catch (error) {
        console.log(error)
        setuserData(null)
    }
}



useEffect(()=>{
    getCurrentUser()
    
},[])


const value={userData,setuserData,}

   
  return (
    <userDataContext.Provider value={value}>
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext