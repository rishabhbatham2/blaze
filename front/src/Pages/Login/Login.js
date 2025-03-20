import React, { useContext, useState } from "react";
import './Login.css'
import ReusableInput from "../../components/ui/ReusableInput/Reusable";

import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../services/NodeServices";

import { useLocale } from "react-admin";
import { toast } from "react-toastify";
import { MyContext } from "../../context/MyContext";



export default function Login(){
    const {loginUser,isloggedIn  } = useContext(MyContext);
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
   const [error,setError]=useState({})
   const [buttonEnabled,setButtonEnaled]=useState(false)

   const navigate = useNavigate()
   const location = useLocation()


        const emailRegex = /^[a-zA-Z0-9.@]*$/
    const passwordRegex = /^[a-zA-Z0-9!@#$^&*]*$/


    const handleError = (name, value) => {
        setError((prevError) => ({
            ...prevError, // Preserve existing errors
            [name]: value, // Update the specific error for the field
        }));
    };

    const validate = () => {
        if (!email || email.trim() == '') {
            handleError('email', 'Email is required');
        } else if (!email.includes('@')) {
            handleError('email', 'Email must contain @');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            handleError('email', 'Email must be in a valid format');
        } else {
            handleError('email', ''); // Clear error if the email is valid
        }

  


    };

    const validatePassword=()=>{
        if (!pass || pass.trim() === '') {
            handleError('password', 'Password is required');
        } else if (pass.length < 8) {
            handleError('password', 'Password must be at least 8 characters long');
        } else if (!/[A-Z]/.test(pass)) {
            handleError('password', 'Password must contain at least one uppercase letter');
        } else if (!/[a-z]/.test(pass)) {
            handleError('password', 'Password must contain at least one lowercase letter');
        } else if (!/[0-9]/.test(pass)) {
            handleError('password', 'Password must contain at least one number');
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
            handleError('password', 'Password must contain at least one special character');
        } else {
            handleError('password', ''); // Clear error if the password is valid
        }
    }
    const isFormValid = () => {
        return Object.values(error).every((value) => value === '');
    };
    
    function handleSubmit(){
        if(validatePassword()&&validate()){
          console.log('validddddddddd')
        }else{
           
        }
    }
    const handleLogin=async()=>{
        const body = { 
        email:email,
        password:pass
  
         }
        
         if(pass&&email/* &&isFormValid() */){
          try{
              const result = await postData('api/users/login',body)
   
              if(result.status){
                   if(!result.redirectUrl){
                    
                      toast.success('logged in')
                      loginUser(result.data.user)
                     const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
                      navigate(redirectPath)
                       
         
                        console.log(result.data)
                   }else{   console.log(result)   ;    loginUser(result.data)   ;  navigate(result.redirectUrl) }
  
   
   
              }else{
                  toast.error(result.message)
              }
          }
          catch{ 
   
           toast.error('Server error')
   
          }
         }
      } 

    return(
        <div className="login__cont">
                      <div className="loginner">

                        <label className="loglabell">
                            Login
                        </label>

                        <ReusableInput 
                           value={email}
                           placeholder={'enter email address'}
                           label={'Email'}
                           setValue={setEmail}
                           regex={emailRegex}
                           onKeyDown={()=>{validate()}}
                           errorlabel={error.email}
                           onFocus={()=>{handleError('email','')}}
                           

                           
                        />
                       
                        <ReusableInput 
                           value={pass}
                           placeholder={'enter password'}
                           label={'Password'}
                           setValue={setPass}
                           onFocus={()=>{handleError('password','')}}
                           onKeyDown={()=>{validatePassword()}}
                           regex={passwordRegex}
                           errorlabel={error.password}

                        />
                        <button className="logbutton" onClick={handleLogin}>Login</button>
                        <label className="bottomlabel">forgot password? <span onClick={()=>{navigate('/reset-password')}}>reset</span></label>
                        <label className="bottomlabel">dont have a account? <span onClick={()=>{navigate('/sign-up')}}>signup</span></label>
                      </div>
                   
        </div>
    )
}