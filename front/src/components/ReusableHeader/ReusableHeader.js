import React from "react";
import { useEffect } from "react";
import './ReusableHeader.css'


export default function ReusableHeader({addFunc,title,number,bg='transparent',filter=true,bread='Dashboard / category'}){
   
    return(
        <div className="reusable__header" style={{backgroundColor:bg}}>
             <div className="reusableheader__left">
                <div className="breadcrumb">
                    {bread}
                </div>

            
             <div className="title">
              <p className="titlename">{title?title:'Category'}</p> <p className="titlevalue">{number?number:''}</p>
             </div>
             </div>
             <div className="reusable__header__right">

               {filter&&<>
                <div className="reusable__header__r1" onClick={addFunc}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99999 1.79999L8.99999 16.2M16.2 8.99999L1.79999 8.99999" stroke="#2B5BEE" stroke-width="2" stroke-linecap="round"/>
</svg>
     create
                </div></>
            
               }

              {/*   <div className="reusable__header__r2">
                  filter
                </div> */}
              
             </div>

        </div>
    )
}