import React from "react";
import { useEffect,useState } from "react";
import './AddressComp.css'
import { postData } from "../../../services/NodeServices";
import { toast } from "react-toastify";
import AddAddress from "../AddAddressForm/AddAddress";
import { useNavigate } from "react-router-dom";


export default function AddressComp({address,setAddress,mode='list'}){

const [addressList,setAddressList]=useState([])
const [selectedAddress,setSelectedAddress]=useState(0)
const navigate = useNavigate()
const getAddress=async()=>{
   try{
    const user = JSON.parse(localStorage.getItem('user')||'[]')

    const result = await postData('api/users/address',{userid:user.userid})



    
    if(result.status){
       setAddressList(result.data)
       setAddress(result.data[0])
       console.log(result.data)
    }else{
      toast.error(result.message)
    }
  
    


   }catch{

   }
}
useEffect(()=>{
getAddress()
},[])
const handleSelected=(item,index)=>{
    setSelectedAddress(index)
    setAddress(item)
}

const deleteAddress=async(item)=>{
 try{
  const result = await postData('api/users/addressdelete',{addressid:item.addressid})
  console.log(result)
  if(result.status){
      toast.success('address deleted sucessfully')
      getAddress()
  }
 }catch{
  toast.error('error deleting address')
 }

}

const AddAddress=()=>{
  if(mode=='quick'){
    navigate('/instantbuy/add-address')
  }else{
    navigate('/cart/add-address')
  }
}



return(
    <div className="addresscomp">


      
     {addressList&&addressList.length!=0?addressList.map((item,index)=>{

        return(
            <div className="address" style={{borderColor:index==selectedAddress?'var(--purple-color)':'#ddd'}}>
            <div className="address__header">
              {item.username}
            </div>
           
            <div className="address__val">
                <p>{`${item.addline1} ${item.addline2?item.addline2:''} , ${item.city} , ${item.state}`}</p>
            </div>
            <div className="address__val">
                <p>{`${item.zipcode} `}</p>
            </div>
            <div className="address__val">
                <p className="addvalll">{item.mobileno}</p>
            </div>
    
            <div className="address__input" onClick={()=>{handleSelected(item,index)}} >
              <button style={index==selectedAddress?{backgroundColor:'var(--purple-color)',color:'#fff'}:{}}>{index==selectedAddress?'Selected':'Select Address'}</button>
            </div>
            
            <div className="addressedit">
              <div onClick={()=>{navigate(`/cart/edit-address/${item.addressid}`)}}>edit</div> 
              <svg width="20"  height="20"  onClick={()=>{deleteAddress(item)}}             viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1H13M1 4H19M17 4L16.2987 14.5193C16.1935 16.0975 16.1409 16.8867 15.8 17.485C15.4999 18.0118 15.0472 18.4353 14.5017 18.6997C13.882 19 13.0911 19 11.5093 19H8.49065C6.90891 19 6.11803 19 5.49834 18.6997C4.95276 18.4353 4.50009 18.0118 4.19998 17.485C3.85911 16.8867 3.8065 16.0975 3.70129 14.5193L3 4M8 8.5V13.5M12 8.5V13.5" stroke="#F02759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
    
          </div>
        )
     }):<></>

     }
     
     <div className="address" onClick={()=>{}}>
         <div className="address__input">
              <p className="noaddresstext">Add new Address</p>
              <div className="address__val">
                <p>Please add a new address to continue</p>
            </div>
            
              <button onClick={()=>{AddAddress()}}>Add new Address</button>
            </div>

     </div>
    </div>
)


}