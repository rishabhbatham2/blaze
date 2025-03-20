import { useState, useEffect, useContext } from "react";
import React from "react";
import "./UserInfo.css";
import { MyContext } from "../../context/MyContext";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { Route, Routes, useNavigate } from "react-router-dom";
import Wallet from "./Wallet/Wallet";
import WalletHistoryList from "./History.js/WalletHistory";
import { postData } from "../../services/NodeServices";

export default function UserInfo() {
  const { user } = useContext(MyContext);

  const [isEditingName, setIsEditingName] = useState(false);
  const [mycoins,setCoins]=useState(false)
  const [mywalletid,setMyWalletid]=useState(false)
  const navigate = useNavigate()

     const getCoins=async()=>{
        try{
    
          const user = JSON.parse(localStorage.getItem('user'))
    
          console.log('are we seidn userid',user.userid)
    
          const result = await postData('api/users/getwallet',{userid:user.userid})
    
          if(result.status){
            setCoins(result.data.coins)
            setMyWalletid(result.data.walletid)
          }
    
        }catch{
    
        }
      }
    
      useEffect(()=>{
    getCoins()
      },[])
  

  return (
    <div className="userinfo__container">
      <div className="userinfo__inner">
        <div className="userinfo__left">
          <div className="profileheader">
            <div className="profileimg">
              <img src="/image/user.png" />
            </div>
            <div>
              <p>Hello</p>
              <p>{user?.firstname}</p>
            </div>
          </div>
          <div className="profileheader" style={{marginTop:'1rem'}}>
            <div className="profileimg">
              <img src="/image/coin.svg" style={{width:31,marginRight:-5,marginLeft:5,}} />
            </div>
            <div>
           
              <p>{mycoins}</p>
            </div>
          </div>
          <div className="profile__links">
            <div className="profile__link1" onClick={()=>{navigate('/orders')}} >
              <div className="profileiconnn">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.17001 6.44L11 11.55L19.77 6.46997M11 20.61V11.54M16 12.24V8.58002L6.51001 3.09998M8.92999 1.48L3.59 4.45003C2.38 5.12003 1.39001 6.80001 1.39001 8.18001V13.83C1.39001 15.21 2.38 16.89 3.59 17.56L8.92999 20.53C10.07 21.16 11.94 21.16 13.08 20.53L18.42 17.56C19.63 16.89 20.62 15.21 20.62 13.83V8.18001C20.62 6.80001 19.63 5.12003 18.42 4.45003L13.08 1.48C11.93 0.84 10.07 0.84 8.92999 1.48Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>My orders</div>
            </div>
            <div className="profile__link1" onClick={()=>{navigate('/userinfo/')}} >
              <div className="profileiconnn">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.17001 6.44L11 11.55L19.77 6.46997M11 20.61V11.54M16 12.24V8.58002L6.51001 3.09998M8.92999 1.48L3.59 4.45003C2.38 5.12003 1.39001 6.80001 1.39001 8.18001V13.83C1.39001 15.21 2.38 16.89 3.59 17.56L8.92999 20.53C10.07 21.16 11.94 21.16 13.08 20.53L18.42 17.56C19.63 16.89 20.62 15.21 20.62 13.83V8.18001C20.62 6.80001 19.63 5.12003 18.42 4.45003L13.08 1.48C11.93 0.84 10.07 0.84 8.92999 1.48Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>Account Info</div>
            </div>
            <div className="profile__link1"  onClick={()=>{navigate('/userinfo/wallet')}} >
              <div className="profileiconnn">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.17001 6.44L11 11.55L19.77 6.46997M11 20.61V11.54M16 12.24V8.58002L6.51001 3.09998M8.92999 1.48L3.59 4.45003C2.38 5.12003 1.39001 6.80001 1.39001 8.18001V13.83C1.39001 15.21 2.38 16.89 3.59 17.56L8.92999 20.53C10.07 21.16 11.94 21.16 13.08 20.53L18.42 17.56C19.63 16.89 20.62 15.21 20.62 13.83V8.18001C20.62 6.80001 19.63 5.12003 18.42 4.45003L13.08 1.48C11.93 0.84 10.07 0.84 8.92999 1.48Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>Wallet</div>
            </div>
            <div className="profile__link1"  onClick={()=>{navigate('/userinfo/wallet-history')}} >
              <div className="profileiconnn">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.17001 6.44L11 11.55L19.77 6.46997M11 20.61V11.54M16 12.24V8.58002L6.51001 3.09998M8.92999 1.48L3.59 4.45003C2.38 5.12003 1.39001 6.80001 1.39001 8.18001V13.83C1.39001 15.21 2.38 16.89 3.59 17.56L8.92999 20.53C10.07 21.16 11.94 21.16 13.08 20.53L18.42 17.56C19.63 16.89 20.62 15.21 20.62 13.83V8.18001C20.62 6.80001 19.63 5.12003 18.42 4.45003L13.08 1.48C11.93 0.84 10.07 0.84 8.92999 1.48Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>History</div>
            </div>
          </div>
        </div>
        <div className="userinfo__right">
        <Routes>
          <Route path="/" element={<ProfileInfo/>} />
          <Route path="wallet" element={<Wallet/>} />
          <Route path="wallet-history" element={<WalletHistoryList walletid={mywalletid} />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}
