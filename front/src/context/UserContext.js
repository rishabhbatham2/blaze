import React, { createContext, useState } from 'react';

const encryptionKey = 'your-secret-key';
// Create a new context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state for the user
  const [isloggedIn ,setisLoggedIn]=useState(false)
  const [coup,setCoup]=useState('')
  const [item,setIteam]=useState({})
  const [cart,setCart]=useState([])

  

  const [myItem,setMyItem]=useState('')
  const [mycode,setMyCode]=useState('')

  const [finalAmt,setFinalAmt]=useState(0)
  

  // Function to update user state (you can add more functionality here)
  const loginUser = (userData) => {
    setUser(userData);
  };

  const saveUser=async(user)=>{
       localStorage.setItem('user',JSON.stringify(user))
  }


  const logoutUser = () => {
    setUser(null);
  };
  
  const setFinal=async(final)=>{
    console.log('set final amount',final)
    await localStorage.setItem('finalamt',JSON.stringify(final))
    setFinalAmt(final)
    return true
  }
  const getFinal=async()=>{
  let myFinal = await localStorage.setItem('finalamt')
  return getFinal  
}

const saveMyItem=async(myItem)=>{
  
  await localStorage.setItem('myitem',JSON.stringify(myItem))
  setMyItem(myItem)

}

 const saveCode=async(mycode)=>{
  await localStorage.setItem('mycode',JSON.stringify(mycode))
   setMyCode(mycode)
}


  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser,isloggedIn,setisLoggedIn,finalAmt,setFinal,item,setIteam,saveUser,setUser,saveMyItem,saveCode,cart,setCart,coup,setCoup, }}>
      {children}
    </UserContext.Provider>
  );
};
