import React, { useState, useEffect, useContext } from "react";
import "../Cart/Cart.css";
import { data, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { postData, serverURL } from "../../services/NodeServices";

import { MyContext } from "../../context/MyContext";

import { toast } from "react-toastify";
import AddressComp from "../Cart/AddressComp/AddressComp";
import AddAddress from "../Cart/AddAddressForm/AddAddress";



export default function InstantBuy() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const variant_id = searchParams.get('variant_id');
  const qty = searchParams.get('qty');

    const [coins, setCoins] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [coinInput, setCoinInput] = useState("");
  
    const [appliedCoins,setAppliedCoins]=useState(0)

     const getCoins = async () => {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
    
          console.log("are we seidn userid", user.userid);
    
          const result = await postData("api/users/getwallet", {
            userid: user.userid,
          });
    
          if (result.status) {
            setCoins(result.data.coins);
          }
        } catch {}
      };
    
      useEffect(() => {
        getCoins();
      }, []);


  const [product,setProduct]=useState(
false
  )

  const getproduct=async()=>{
    
    const result = await postData('api/products/getvariantbyid',{variant_id:variant_id})
    if(result.status){
        setProduct(
            [
                {
                    variant:result.data,
                    quantity:qty?qty:1
                }
            ]
        )
       
    }
  }
  useEffect(()=>{
   getproduct()
  },[])
  useEffect(() => {
    if (product) {
        generateBill();
    }
}, [product]);

console.log(product)

  const { cart, setCart,user ,isloggedIn} = useContext(MyContext);

  const [myaddress,setMyaddress]=useState('')
  const [bill, setBill] = useState(false);
  const [loading ,setLoading]=useState(true)
  const [couponText,setCouponText]=useState("")
  const [coupon,setCoupon]=useState(false)


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
     
      console.log('address we seidning is ',myaddress)
    

    loadRazorpayScript();

    const response = await fetch(`${serverURL}create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: bill.finalPrice }),
    });

    const order = await response.json();

    const options = {
      key: "rzp_live_ihXhp7al0XuYsU",
      /*   key:"rzp_test_nt89OO93hs7lOa", */
      amount: order.amount,
      currency: order.currency,
      name: "Products",
      description: "Payment for buying shirt",
      order_id: order.id,
      handler: async (paymentResponse) => {
        console.log(paymentResponse);

        const verifyResponse = await fetch(`${serverURL}verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_id: paymentResponse.razorpay_payment_id,
            order_id: paymentResponse.razorpay_order_id,
            signature: paymentResponse.razorpay_signature,
            data:{list:product,bill:bill,address:myaddress,coins:appliedCoins}
         
          }),
        });

        const verificationResult = await verifyResponse.json();
        console.log(verificationResult);

        if (verificationResult.status) {
           
         /*  setCart([]) */
         
         

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









  

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };


  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and prevent input greater than available coins
    if (/^\d*$/.test(value) && Number(value) <= coins) {
      setCoinInput(value);
    }
  };



  const generateBill = () => {
    let totalPrice = 0;
    let shippingPrice = 70; // Example shipping price, you can adjust this as needed

    // Map each product to the required bill structure
    const billItems = product.map((item) => {
      const productDetail = `${truncateText(
        item.variant.variantname,
        61
      )}, Size: ${item.variant.size}, `;
      const productPrice = item.variant.current_price * item.quantity; // Assuming price is per unit and quantity is specified

      totalPrice += productPrice;
     

      return {
        product: productDetail,
        size: item.variant.size,
        color: item.variant.color,
        price: productPrice,
      };
    });
    if(totalPrice>500){
      shippingPrice=0
    }

     let discount = coupon?Math.min(parseInt((totalPrice * coupon.value) / 100), coupon.maxval):0
    // Create the final structure with 'items', shipping, and final price
    let coinvalue = 0
    if(coinInput){
      coinvalue = parseInt(coinInput)
    }


    const bill = {
      items: billItems,
      shipping:totalPrice>500?0:70,
      discount:discount+coinvalue,
      
      finalPrice: totalPrice +parseInt( shippingPrice) - parseInt( discount) - coinInput,
    };

    setBill(bill); // Update the state with the new bill structure
  };
  const generateBill2 = () => {
    let totalPrice = 0;
    let shippingPrice = 70; // Example shipping price, you can adjust this as needed

    // Map each product to the required bill structure
    const billItems = product.map((item) => {
      const productDetail = `${truncateText(
        item.variant.variantname,
        61
      )}, Size: ${item.variant.size}, `;
      const productPrice = item.variant.current_price * item.quantity; // Assuming price is per unit and quantity is specified

      totalPrice += productPrice;
     

      return {
        product: productDetail,
        size: item.variant.size,
        color: item.variant.color,
        price: productPrice,
      };
    });
    if(totalPrice>500){
      shippingPrice=0
    }

     let discount = coupon?Math.min(parseInt((totalPrice * coupon.value) / 100), coupon.maxval):0
    // Create the final structure with 'items', shipping, and final price
    


    const bill = {
      items: billItems,
      shipping:totalPrice>500?0:70,
      discount:discount,
      
      finalPrice: totalPrice +parseInt( shippingPrice) - parseInt( discount) ,
    };

    setBill(bill); // Update the state with the new bill structure
  };
  const location = useLocation();

  const handleContinue = () => {
    
    if (location.pathname == "/instant/select-address"&&isloggedIn) {
      navigate("/instantbuy/")
    } else/*  if (location.pathname == ("/instantbuy/"||'/instantbuy') && myaddress) */ {
      handleSubmit()
    }
    console.log(bill,myaddress,product,location.pathname);
  }




  const validateCoupon=async()=>{
    console.log('coupon code we sending is ',couponText)
    try{
   const result = await postData('api/coupons/validate',{couponname:couponText})
   console.log(result)
     if(result.status){
      if(result.coupon){
        toast.success('coupon code has been added')
        setAppliedCoins(0)
        setCoinInput(0)
        setCoupon(result.coupon)
       
      }else{
        toast.error('coupon code is invalid')
      }
     
     }
    }
    catch{
      
    }
  }

  useEffect(() => {
    if (product) {
      generateBill();
    }
  }, [coupon]); 



  const applyCoins = () => {
  
  
    if (coinInput > 0 && coinInput <= coins && coinInput < bill.finalPrice) {
      
      console.log('we setting applied coin as ',coinInput)
   
      setAppliedCoins(coinInput)
   
      setShowInput(false);
    
      generateBill();
    
     
    } else {
      alert("Invalid coin amount!");
    }
  };

  const handleCoinCancel=()=>{
    setAppliedCoins('')
    setCoinInput('')
    setShowInput(false)
    generateBill2()
  }

  const ProductList = () => {
    return (
  
     
         product&&product.length>=1?<>
              <div className="cart_card">
                <img
                  src={`${serverURL}images/${
                    product[0].variant.image_url.split(",")[0]
                  }`}

                  alt=""

                />

                <div className="cart__carddata">
                  <p className="carttitle">{product[0].variant.variantname}</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p>₹ {product[0].variant.price}</p>
                    <p>₹ {product[0].variant.current_price}</p>
                  </div>
                  <div
                    className="cart__quantity"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <p>Quantity:</p> <p>{product[0].quantity}</p>
                  </div>
                  <div
                    className="cart__quantity"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <p>Size</p> <p>{product[0].variant.size}</p>
                  </div>
                </div>
              </div></>:<></>
             

         
    );
  };

const cancelCoupon=()=>{
  setCoupon(false)
  setCouponText('')
}

  return (
    <div className="cart__cont">
      <div className="cart__inner">
        <div className="cart__left">
          <Routes>
            <Route path="/add-address" element={<AddAddress  mode={'quick'} />} />
       
            <Route path="/" element={<div>

                <ProductList/>
                <AddressComp address={myaddress} setAddress={setMyaddress} mode={'quick'}/>
            </div>} />
          </Routes>
        </div>
         {product&&product.length!=0?   <div className="cart__right">
          <div className="cartright__header">{`Price Details`}</div>

          <div className="coupon">
            {coupon?<>
            <div className="couponnnnn">
              coupon applied
              <svg onClick={cancelCoupon} style={{position:'absolute',right:'1rem',cursor:'pointer'}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1H13M1 4H19M17 4L16.2987 14.5193C16.1935 16.0975 16.1409 16.8867 15.8 17.485C15.4999 18.0118 15.0472 18.4353 14.5017 18.6997C13.882 19 13.0911 19 11.5093 19H8.49065C6.90891 19 6.11803 19 5.49834 18.6997C4.95276 18.4353 4.50009 18.0118 4.19998 17.485C3.85911 16.8867 3.8065 16.0975 3.70129 14.5193L3 4M8 8.5V13.5M12 8.5V13.5" stroke="#f2f2f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            </>:<>
            <input  type="text" placeholder="apply  coupon..." value={couponText} onChange={(e)=>{setCouponText(e.target.value)}} />   <button onClick={validateCoupon}>Apply</button>
            </>

            }

          </div>




          {showInput?<>
            <div className="use__coins">
                <input
                 style={{width:'71%',padding:'5px 11px'}}
                type="text"
                value={coinInput}
                onChange={handleInputChange}
                placeholder="Enter coins"
              />
              <div className="apply_button" onClick={applyCoins}>
                Add
              </div>
            </div>
            </>:appliedCoins>0?<>
            <div className="use__coins">
            <div className="applycoingsinput" >
            {appliedCoins} coins used   
            </div>

            <div className="apply_button" onClick={handleCoinCancel}>
             Cancel
            </div>
            </div>
            
            </> : (
                <div className="use__coins" onClick={() => setShowInput(true)}>
                <p>use coins</p>
              </div>
         
            )

           }

          {bill &&
            bill.items.map((item) => {
              return (
                <div className="cartright__details">
                  <p>{item.product} </p> <span>₹ {item.price}</span>{" "}
                </div>
              );
            })}
         {bill && bill.length != 0 &&coupon? (
            <div className="cartright__details">
              <p>{"Discount"} </p> <span>₹ {parseInt((bill.discount))}</span>{" "}
            </div>
          ) : (
            <></>
          )}
            {bill && bill.length != 0 ? (
            <div className="cartright__details">
              <p>{"Shipping Cost"} </p> <span>₹ {bill.shipping}</span>{" "}
            </div>
          ) : (
            <></>
          )}

          {bill && bill.length != 0 ? (
            <div className="cartright__details">
              <p>{"Total Cost"} </p> <span>₹ {bill.finalPrice}</span>{" "}
            </div>
          ) : (
            <></>
          )}
          <div className="cartbutton">
            {isloggedIn?<button className="logbutton" onClick={handleContinue}>
              Buy Now
            </button>:<button className="logbutton" onClick={()=>{navigate('/log-in')}}>
              Please login to Continue
            </button>}
          </div>
        </div>:<></>}
      </div>
    </div>
  );
}
