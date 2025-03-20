import React, { useState } from "react";
import { useEffect } from "react";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
import { postData, serverURL } from "../../services/NodeServices";

export default function Wishlist() {
  const navigate = useNavigate();

  const gettopProducts = async () => {
    const results = await postData("api/products/top");
    if (results.status) {
      SetTopProducts(results.data.slice(0, 4));
    }
  };

  const [topProducts, SetTopProducts] = useState([]);

  useState(() => {
    gettopProducts();
  }, []);

  return (
    <div className="wishlist__cont">
      <div className="wishlist__inner">
        <div className="wishlist__left">
          {/* <div className="wishlist__header">Wishlist</div> */}

          <div className="wishlist__cards">
            {topProducts?.map((item) => (
              <div
                className="wishlist__card"
               /*  onClick={() => {
                  handleProductClick(item.product_id);
                }} */
              >
                <div className="wishlist_card">
                  <img src={`${serverURL}images/${item.image_url}`} alt="" />
                  <div className="wishlist__carddata">
                    <p>{item.name}</p>
                   <div style={{display:'flex',alignItems:'center'}}> <p> ₹ {item.base_price}</p><p> ₹ {item.base_price}</p></div>
                    
                </div>
                 
                </div>
             
                
              </div>
            ))}
          </div>
        </div>
        <div className="wishlist__right">
            <div className="wishlistright__header">
              username
            </div>
        </div>
      </div>
    </div>
  );
}
