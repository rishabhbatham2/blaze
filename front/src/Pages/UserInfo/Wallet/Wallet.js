import React, { useContext, useEffect, useState } from "react";
import "./Wallet.css";

import { postData, serverURL } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../../../context/MyContext";
import BankDetailsForm from "../BankForm/BanForm";

export default function Wallet() {
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState(0);
  const {user} = useContext(MyContext)

  const [coins ,setCoins]=useState(false)
  const [walletid,setWalletid]=useState(false)




  const navigate = useNavigate()

  const handleAddCoins = () => {
    setShowPopup(true);
  };

  const handleConfirmAdd = () => {
    alert(`Added ${amount} coins`);
    setShowPopup(false);
  };


   const getCoins=async()=>{
      try{
  
        const user = JSON.parse(localStorage.getItem('user'))
  
        console.log('are we seidn userid',user.userid)
  
        const result = await postData('api/users/getwallet',{userid:user.userid})
  
        if(result.status){
          setCoins(result.data.coins)
          setWalletid(result.data.walletid)
        }
  
      }catch{
  
      }
    }
  
    useEffect(()=>{
  getCoins()
    },[])



  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () =>
        reject(new Error("Failed to load Razorpay script"));
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async () => {


  /*   if(!validate()){
      return
    } */
     
      setShowPopup(false)
     
    

    loadRazorpayScript();

    const response = await fetch(`${serverURL}create-order-wallet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount:amount }),
    });

    const order = await response.json();

    const options = {
     /*  key: "rzp_live_ihXhp7al0XuYsU", */
        key:"rzp_test_nt89OO93hs7lOa",
      amount: order.amount,
      currency: order.currency,
      name: "Products",
      description: "Payment for buying coinss",
      order_id: order.id,
      handler: async (paymentResponse) => {
        console.log(paymentResponse);

        const verifyResponse = await fetch(`${serverURL}verify-payment-wallet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_id: paymentResponse.razorpay_payment_id,
            order_id: paymentResponse.razorpay_order_id,
            signature: paymentResponse.razorpay_signature,
            data:{userid:user.userid}
         
          }),
        });

        const verificationResult = await verifyResponse.json();
        console.log(verificationResult);

        if (verificationResult.status) {
           
        
         
          toast.success('coins added successfully')

          setTimeout(() => {
            navigate("/");
          }, 511);
        } else {
         
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="wallter__cont">
   {/*   {<> <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgb(228, 228, 99)",
          padding: "5px 11px",
          marginBottom: "1rem",
        }}
      >
        <img src="/image/coin.svg" style={{ height: 21, marginRight: 7 }} />{" "}
        <p>{coins}</p>
      </div></>}
     {<> <div className="wallet__conins">
        <p>You have {coins} coins curently</p>
      </div></>} */}

      <div className="wallett" >Add coins</div>
      <div className="addcoinbutton"  onClick={handleAddCoins} >
        <svg
          width="13"
          height="13"
          style={{ marginRight: 7 }}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7L4 1M1 4H7"
            stroke="#222222"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p>add</p>
      </div>

      <div className="wallett">Withdrawls</div>
      <BankDetailsForm coins={coins} walletid={walletid}/>
      <div className="widthdrawlbank"></div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add Coins</h3>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/, ""))}
              placeholder="Enter amount"
              
            />
          <div style={{display:'flex'}}>
          <button onClick={handleSubmit}>Add</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
