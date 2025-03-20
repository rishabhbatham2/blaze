import React, { useEffect } from "react";
import { useState } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/NodeServices";

export default function Footer() {
  const navigate = useNavigate();

     const [subcat,setSubCat]=useState([])
     const [subcat2,setSubCat2]=useState([])

    const getAllSubcategory = async () => {
      const results = await postData("api/productsubcategory/bycategory",{productcategoryname:'men'});
  
  
  /*  const results = await getDatanew("api/productcategory/all"); */
     
      if (results.status) {
         
        setSubCat(results.data.slice(0, 4));
       
      }else{
        setSubCat([])
      }
    };
    const getAllSubcategory2 = async () => {
      const results = await postData("api/productsubcategory/bycategory",{productcategoryname:'women'});
  
  
  /*  const results = await getDatanew("api/productcategory/all"); */
     
      if (results.status) {
         
        setSubCat2(results.data.slice(0, 3));
       
      }else{
        setSubCat2([])
      }
    };

    useEffect(()=>{
    getAllSubcategory()
    getAllSubcategory2()
    },[])


    const scrollToTop = () => {
      const mainElement = document.querySelector('.App');
      if (mainElement) {
        mainElement.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

  
  return (
    <section class="footersection">
      <div class="row g-0">
        <div class="col-md-3 col-6">
          <div class="footer_firstsection">
            <div class="footer_firstsection_title">Categories</div>
            <div class="footer_firstsection_content">
              <li
                onClick={() => {
                  scrollToTop();
                  navigate(`/category/men/All`);
                }}
              >
                Men
              </li>
              <li
                onClick={() => {
                  scrollToTop();
                  navigate(`/category/women/All`);
                }}
              >
                Women
              </li>
              {subcat&&subcat.map((item)=>{
                return(
           /*        <li
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/category/men/Classic%20Tees`);
                  }}
                >
                  Classic Tees
                </li>
                <li
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/category/men/Oversized%20Tees`);
                  }}
                >
                  Oversized Tees
                </li>
                <li
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/category/men/Fashion%20Joggers`);
                  }}
                >
                  Fashion Joggers
                </li>
                <li
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/category/men/Hoodies`);
                  }}
                >
                  Hoodies
                </li> */
                <li
                  onClick={() => {
                    scrollToTop();
                    navigate(`/category/men/${item.productsubcategoryname}`);
                  }}
                >
                 men {item.productsubcategoryname}
                </li>
                )
              })}
                {subcat2&&subcat2.map((item)=>{
                return(
                <li
                  onClick={() => {
                    scrollToTop();
                    navigate(`/category/women/${item.productsubcategoryname}`);
                  }}
                >
                 women {item.productsubcategoryname}
                </li>
                )
              })}
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="footer_firstsection">
            <div class="footer_firstsection_title">Need Help</div>
            <div class="footer_firstsection_content">
          {/*     <li>Track Your Order</li>
              <li>Returns & Exchanges</li> */}
              
              <a href="https://wa.me/9821847815" target="_blank" rel="noopener noreferrer">
              <li>Chat on WhatsApp</li>
</a>
              <li    onClick={() => {
                  navigate("/contact-us");
                }}>Contact Us</li>
              <li   onClick={() => {
                  navigate("/faq");
                }}>FAQs</li>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="footer_firstsection">
            <div class="footer_firstsection_title">Company</div>
            <div class="footer_firstsection_content">
              <li
                onClick={() => {
                  navigate("/refund-and-cancellation");
                }}
              >
                Refund and Cancellation
              </li>
              <li
                onClick={() => {
                  navigate("/privacy-policy");
                }}
              >
                Privacy Policy
              </li>
              <li
                onClick={() => {
                  navigate("/terms");
                }}
              >
                Terms & Conditions
              </li>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="footer_firstsection">
            <div class="footer_firstsection_title">Get in touch</div>
            <div className="footer_firstsection_address">
            Head Office: A-49, Engine House, Mohan Industrial Estate, Mathura Road, New Delhi, India,PIN - 110044
            </div>
            <div class="footer_firstsection_content">
            <div style={{marginBottom:15}}>
                
              </div>
              
               

              <a href="https://www.instagram.com/blazestore.in/" target="_blank" rel="noopener noreferrer">
  
  <i class="fa-brands fa-instagram"></i>
</a>            <a href="https://www.facebook.com/profile.php?id=61567288265655"><i class="fa-brands fa-facebook"></i> </a>
              
              
              <a href="https://wa.me/9821847815" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-whatsapp"></i>
</a>

            </div>

           
          </div>
       
        </div>
        <div style={{marginBottom:15,width:'99%',marginTop:12,display:'flex',flexDirection:'column',alignItems:'flex-start',textAlign:'left',paddingTop:19}}>
                <img src="/image/blaze.png" style={{width:131}}/>
              </div>
              
              <div className="footerlogobottom" style={{marginBottom:15,display:'flex',justifyContent:'flex-start'}}>
                a part of clan buisness private limited
              </div>
      </div>
    </section>
  );
}
