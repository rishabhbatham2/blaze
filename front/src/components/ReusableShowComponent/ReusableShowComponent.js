import React from "react";
import { useState, useEffect } from "react";
import './ReusableShowComponent.css';
import { serverURL } from "../../services/NodeServices";

export default function ReusableShowComp({data}) {
  const mydata = {
    product_id:data.product_id,
    product:data.name,
    images: data.image_url.split(','),
    description:data.description
  };

  return (
    <div className="reusable__view">
      <div className="reusable__view__data">
      
        <div className="datat">
          {Object.entries(mydata).map(([key, value]) => (
            <div className="data-item" key={key}>
                
              <p>{key.replace(/_/g, ' ').toUpperCase()}:</p>
              {key === 'images' ? (
               <>{
                mydata.images.map((item)=>{
                    return(
                        <img
                        src={`${serverURL}images/${item}`}
                        alt={data.product}
                        className="product-image" style={{width:71,marginRight:15,borderRadius:11,marginTop:11}}
                      />
                    )
                })
               }
               </>
              ) : (
                value
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
