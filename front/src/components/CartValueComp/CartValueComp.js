import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import './CartValueComp.css'
import { useNavigate } from "react-router-dom";

export default function CartValueComp({ selVariant, variant }) {
  const navigate = useNavigate()
  const { cart, setCart } = useContext(MyContext);
  const [quantity,setquantity]=useState(0)

  const isInCart = cart.some((item) => item.variant.variant_id === selVariant);



  const addToCart = () => {
    const existingItem = cart.find((item) => item.variant.variant_id === selVariant);

    let updatedCart;
    if (existingItem) {
      // Item already in cart, do nothing for now
    } else {
      const selectedVariantData = variant.find((variant) => variant.variant_id === selVariant);
      updatedCart = [...cart, { variant: selectedVariantData, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
   const viewCart=()=>{
   /*  navigate('/cart') */
    navigate(`/instantbuy?variant_id=${selVariant}&qty=1`)
    window.scrollTo(0, 0); 
   }

  const updateQuantity = (variantId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.variant.variant_id === variantId) {
        if (newQuantity === 0) {
          // Remove item if quantity is 0
          return null;
        }
        setquantity(newQuantity)

        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item !== null); // Filter out null items (removed ones)

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = () => {
    const item = cart.find((item) => item.variant.variant_id === selVariant);
    if (item) {
      updateQuantity(selVariant, item.quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    const item = cart.find((item) => item.variant.variant_id === selVariant);
    if (item && item.quantity > 1) {
      updateQuantity(selVariant, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      // If quantity is 1, remove item from cart
      updateQuantity(selVariant, 0);
    }
  };

  return (
    <div className="button__cont">
      {!isInCart ? (
       <> <button className="addtocart fc" onClick={addToCart}>
       Add To Cart
     </button>
        <button className="addtocart" onClick={viewCart}>
       Buy Now
     </button></>
      ) : (<>
        <div className="quantityselector">
        
          <button
            type="button"
            onClick={decreaseQuantity}
            className="quantitybutton"
          >
            -
          </button>
          <span className="quantitydisplay">
            {
              cart.find((item) => item.variant.variant_id === selVariant)
                .quantity
            }
          </span>
          <button
            type="button"
            onClick={increaseQuantity}
            className="quantitybutton"
          >
            +
          </button>
        </div>
          <button className="addtocart" onClick={viewCart}>
           Buy now
        </button>
        </>
      )}
    </div>
  );
}
