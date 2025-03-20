import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../context/MyContext";
import "./ProfileInfo.css";
import { postData } from "../../../services/NodeServices";
import { toast } from "react-toastify";

export default function ProfileInfo() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingMobileno, setIsEditingMobileNo] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const { user } = useContext(MyContext);

  let inituser = JSON.parse(localStorage.getItem('user'))

  console.log(inituser)

  const [firstname,setFirstName]=useState(inituser?.firstname)

  const [lastName,setLastName]=useState(inituser?.lastname)
  const [gender,setGender]=useState(inituser?.gender)
  const [mobile,setMobile]=useState(inituser?.mobile)
  const [email,setEmail]=useState(inituser?.email)


  const handleApplyChanges=async()=>{

    
    try{
        const result = await postData('api/users/updateuser',{mobile,firstname,lastname:lastName,gender,userid:inituser.userid})
        console.log('are we seinding lastname,',lastName)
        if(result.status){
            toast.success('Changes applied Succesfully')
            let token = inituser.token
            let newdata = result.data
            newdata['token'] =token
             localStorage.setItem('user',JSON.stringify(newdata))
            console.log(newdata)
        }

       setIsEditingName(false)
       setIsEditingMobileNo(false)
       setIsEditingEmail(false)

       console.log('form to submit is' ,firstname,lastName,gender,mobile)

    }catch{

    }
  }
const handelApplygeder=async(gender)=>{

  setGender(gender)
    
  try{
    const result = await postData('api/users/updateuser',{mobile,firstname,lastname:lastName,gender,userid:inituser.userid})
    console.log('are we seinding lastname,',lastName)
    if(result.status){
        toast.success('Changes applied Succesfully')
        let token = inituser.token
        let newdata = result.data
        newdata['token'] =token
         localStorage.setItem('user',JSON.stringify(newdata))
        console.log(newdata)
    }

   setIsEditingName(false)
   setIsEditingMobileNo(false)
   setIsEditingEmail(false)

   console.log('form to submit is' ,firstname,lastName,gender,mobile)

}catch{

}

}


  return (
    <div className="profileino__container">
    {user&&  <div className="username">
        <div className="usernameheading">
          <p>Personal Information</p>{" "}
          <p
            onClick={() => {
              setIsEditingName(!isEditingName);
            }}
          >
            Edit
          </p>
        </div>
     
        <div className="userinfo__data">
          <input
            style={{
                borderColor:isEditingName?'#142fd9':"#ffffff"
                   
                  
               }}
            disabled={!isEditingName}
            value={firstname}
            onChange={(e)=>{setFirstName(e.target.value)}}
          />

          <input   style={{
            borderColor:isEditingName?'#142fd9':"#ffffff"
               
              
           }} 
           
           value={lastName}
           onChange={(e)=>{setLastName(e.target.value)}}
           disabled={!isEditingName} />
        </div>
        {isEditingName&&  <div className="applybuttoncont">
        <button className="apply-button" onClick={handleApplyChanges}>Apply Changes</button>
        </div>

      }

        <div className="userinfo__data2">
          <div className="userinfodata__heading">Your Gender</div>
          <div className="genders">
            <div className="genderrr" onClick={()=>{handelApplygeder('Male')}} style={{backgroundColor:gender=="Male"?'#1644b9':"",color:gender=="Male"?"#fff":"#222"}}>Male</div>
            <div className="genderrr" onClick={()=>{handelApplygeder('Female')}} style={{backgroundColor:gender=="Female"?'#1644b9':"",color:gender=="Female"?"#fff":"#222"}}>Female</div>
          </div>
        </div>
      </div>}
      <div className="username">
        <div className="usernameheading">
          <p>Mobile Number</p>{" "}
          <p
            onClick={() => {
              setIsEditingMobileNo(!isEditingMobileno);
            }}
          >
            Edit
          </p>
        </div>
        <div className="userinfo__data">
          <input
           style={{
            borderColor:isEditingMobileno?'#142fd9':"#ffffff"
               
              
           }}
            disabled={!isEditingMobileno}
            value={mobile}
            onChange={(e)=>{setMobile(e.target.value)}}
          />
        </div>
      </div>
      <div className="username">
        <div className="usernameheading">
          <p>Email</p>{" "}
          <p
            onClick={() => {
              setIsEditingEmail(!isEditingEmail);
            }}
          >
            Edit
          </p>
        </div>
        <div className="userinfo__data">
          <input
            style={{
             borderColor:isEditingEmail?'#142fd9':"#ffffff"
                
               
            }}
            disabled={!isEditingEmail}
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        {(isEditingName||isEditingEmail||isEditingMobileno)&&  <div className="applybuttoncont">
        <button className="apply-button" onClick={handleApplyChanges}>Apply Changes</button>
        </div>

      }
      </div>
     
    </div>
  );
}
