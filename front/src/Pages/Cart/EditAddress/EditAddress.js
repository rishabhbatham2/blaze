import React, { useContext, useEffect, useState } from "react";
import "./AddAddress.css";
import { toast } from "react-toastify";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import ReusableInput from "../../../components/ui/ReusableInput/Reusable";
import { postData } from "../../../services/NodeServices";
import { MyContext } from "../../../context/MyContext";
import ReusableDropdown from "../../../components/ui/ReusableDropDown/ReusableDropDown";
import { email } from "react-admin";

export default function EditAddress({mode='list'}) {
  const { id } = useParams();


  const [fetchedAddress,setFetchedAddress]=useState(false)
  const getAddress=async()=>{
    try{
     const result = await postData('api/users/getaddressbyid',{addressid:id})
     if(result.status){
      setFetchedAddress(result.data)

      setMainAddress(result.data.addline1 || "");
      setAddressLine2(result.data.addline2 || "");

      setCity(result.data.city || "");

      setState(result.data.state || "");
      setZipCode(result.data.zipcode || "");
      setUsername(result.data.username || "");
      setMobileNo(result.data.mobileno || "");
      getCityList(result.data.state)
     }
    
    console.log(result.data.city)

    }catch{

      
    }
  }

  useEffect(()=>{
  getAddress()
  },[])

  const [mainaddress, setMainAddress] = useState(fetchedAddress?fetchedAddress.addline1:'');
  const [addressLine2,setAddressLine2]=useState(fetchedAddress?fetchedAddress.addline2:'');
  const [addressLine3,setAddressLine3]=useState("");


 



  
 const [userid,getUserId] = useState(JSON.parse(localStorage.getItem('user')).userid)
  const [city, setCity] = useState('Agra');
  const [stateList,setStateList]=useState(["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]

)
const [cityList,setCityList]=useState([]
)
  const [state, setState] = useState(fetchedAddress.state?fetchedAddress.state:'');
  const [zipcode, setZipCode] = useState(fetchedAddress.zipcode?fetchedAddress.zipcode:'');
  const [username, setUsername] = useState(fetchedAddress.username);
  const [mobileno, setMobileNo] = useState(fetchedAddress?fetchedAddress.mobileno:'');
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleError = (name, value) => {
    setError((prevError) => ({
      ...prevError,
      [name]: value,
    }));
  };

  const getCityList=async(state)=>{
   
    try{
        const result = await postData('api/order/getcity',{state:state})
        if(result.status){
          setCityList(result.data)
        }
    }
    catch{

    }
  }


  const validateMainAddress = () => {
    if (!mainaddress || mainaddress.trim() === "") {
      handleError("mainaddress", "Main Address is required");
      return false;
    }
    handleError("mainaddress", "");
    return true;
  };
  const validateMainAddress2 = () => {
    if (!addressLine2 || addressLine2.trim() === "") {
      handleError("mainaddress2", "Main Address is required");
      return false;
    }
    handleError("mainaddress2", "");
    return true;
  };

  const validateCity = () => {
    if (!city || city.trim() === "") {
      handleError("city", "City is required");
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(city)) {
      handleError("city", "City must contain only letters");
      return false;
    }
    handleError("city", "");
    return true;
  };

  const validateZipCode = () => {
    if (!zipcode || zipcode.trim() === "") {
      handleError("zipcode", "Zip Code is required");
      return false;
    } else if (!/^\d{5,6}$/.test(zipcode)) {
      handleError("zipcode", "Zip Code must be 5-6 digits");
      return false;
    }
    handleError("zipcode", "");
    return true;
  };

  const validateUsername = () => {
    if (!username || username.trim() === "") {
      handleError("username", "Username is required");
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(username)) {
      handleError("username", "Username must be alphanumeric");
      return false;
    }
    handleError("username", "");
    return true;
  };

  const validateMobileNo = () => {
    if (!mobileno || mobileno.trim() === "") {
      handleError("mobileno", "Mobile Number is required");
      return false;
    } else if (!/^\d{10}$/.test(mobileno)) {
      handleError("mobileno", "Mobile Number must be of 10 digits");
      return false;
    }
    handleError("mobileno", "");
    return true;
  };

  const validateForm = () => {
    const isMainAddressValid = validateMainAddress();
    const isCityValid = validateCity();
    const isZipCodeValid = validateZipCode();
    const isUsernameValid = validateUsername();
    const isMobileNoValid = validateMobileNo();

    return isMainAddressValid && isCityValid && isZipCodeValid && isUsernameValid && isMobileNoValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const data = {
      addressid:fetchedAddress.addressid,
      userid:userid,
      addline1:mainaddress,
      addline2:addressLine2,
      city:city,
      state:state,
      zipcode:zipcode,
      username:username,
      mobileno:mobileno,
      
    };
   let body={data:data}
    try {

   


   const result = await postData('api/order/is-serviceable',{pincode:zipcode})
   if(result.status&&result.serviceable){
    const result = await postData('api/users/addressedit',{   addressid:fetchedAddress.addressid,
    
      addline1:mainaddress,
      addline2:addressLine2,
      city:city,
      state:state,
      zipcode:zipcode,
      username:username,
      mobileno:mobileno,
      })

    if (result.status) {
      toast.success("Address edited successfully");
     if(mode=='quick'){
      navigate('/quick/select-address')
     }else{
      navigate('/cart/select-address')
     }
      
    } else {
      toast.error(result.message || "Failed to add address");
    }
   }else{
    toast.error('pincode is not servicables')
   }



    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="add-address__cont">
      <div className="add-address-inner">
        <label className="add-address-label">Edit Address</label>
        <ReusableInput
          value={username}
          placeholder="Enter Username"
          label="Username"
          setValue={setUsername}
          onFocus={() => handleError("username", "")}
          onBlur={validateUsername}
          errorlabel={error.username}
          regex={/^[a-zA-Z\s]*$/}
        />


        <ReusableInput
          value={mobileno}
          placeholder="Enter Mobile Number"
          label="Mobile Number"
          setValue={setMobileNo}
          onFocus={() => handleError("mobileno", "")}
          onKeyDown={validateMobileNo}
          errorlabel={error.mobileno}
          regex={/^[0-9]{0,5}$/}
          maxLength={10}
        />

        <ReusableInput
          value={mainaddress}
          placeholder="Enter Main Address"
          label="Main Address"
          setValue={setMainAddress}
          onFocus={() => handleError("mainaddress", "")}
          onBlur={validateMainAddress}
          errorlabel={error.mainaddress}
          regex={/^[a-zA-Z0-9\s]*$/}
        />
         <ReusableInput
          value={addressLine2}
          placeholder="Enter Main Address"
          label="Address Line 2"
          setValue={setAddressLine2}
          onFocus={() => handleError("mainaddress", "")}
          onBlur={validateMainAddress2}
          errorlabel={error.mainaddress2}
          regex={/^[a-zA-Z0-9\s]*$/}
        />
{/* 
        <ReusableInput
          value={city}
          placeholder="Enter City"
          label="City"
          setValue={setCity}
          onFocus={() => handleError("city", "")}
          onBlur={validateCity}
          errorlabel={error.city}
          regex={/^[a-zA-Z\s]*$/}
        /> */}

        <ReusableInput
          value={zipcode}
          placeholder="Enter Zip Code"
          label="Zip Code"
          setValue={setZipCode}
          onFocus={() => handleError("zipcode", "")}
          onKeyDown={validateZipCode}
          errorlabel={error.zipcode}
          regex={/^[0-9]{0,5}$/}
        />
        <ReusableDropdown
        value={state}
        setValue={setState}
        list={stateList}
        heading={'State'}
        api={getCityList}
        

        />
        <ReusableDropdown
        value={city}
        setValue={setCity}
        list={cityList}
        heading={'City'}
        
        

        />

     

       

        <button className="add-address-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
