import React, { useEffect, useState } from "react";
import { postData, serverURL } from "../../services/NodeServices";
import "./Home.css"; // Ensure you have a CSS file for styling
import { useNavigate } from "react-router-dom";
import SliderSection from "../Swiper";
import CountdownTimer from "./CountDown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet";

const Home = () => {

  const navigate = useNavigate()
  
  const gettopProducts=async()=>{
    const results = await  postData('api/products/top')
    if(results.status){
      SetTopProducts(results.data.slice(0, 4));
      setLoadingTopProducts(false);
    }
  }
  const gettopProductsMan=async()=>{
    const results = await  postData('api/products/topman')
    if(results.status){
      SetTopProductsMan(results.data.slice(4, 8));
      setLoadingTopProductsMan(false);
    }
  }
  const gettopProductsWomen=async()=>{
    const results = await  postData('api/products/topwomen')
    if(results.status){
      SetTopProductsWomen(results.data.slice(4, 8));
      setLoadingTopProductsWomen(false);
      console.log(topProductsWomen)
    }
  }
  const [topProducts,SetTopProducts]=useState([])
  const [topProductsMan,SetTopProductsMan]=useState([])
  const [topProductsWomen,SetTopProductsWomen]=useState([])

  const [loadingTopProducts, setLoadingTopProducts] = useState(true);
  const [loadingTopProductsMan, setLoadingTopProductsMan] = useState(true);
  const [loadingTopProductsWomen, setLoadingTopProductsWomen] = useState(true);


  useState(()=>{
   gettopProducts()
   gettopProductsMan()
   gettopProductsWomen()
  },[])

  const handleProductClick=async(product_id)=>{
    navigate(`/view/${product_id}`);

  }

  useEffect(function(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This enables smooth scrolling to the top
    });
  },[])


  const renderSkeletonCard = () => (
    <div className="col-md-3 col-6">
      <div className="firstsection_card">
        <Skeleton height={200} />
        <Skeleton width={`80%`} />
        <Skeleton width={`60%`} />
      </div>
    </div>
  );

  const test=()=>{
   console.log('local result is',localStorage.getItem('user'))
  }

  return (
    <>
      {/* Navbar Section */}
    

      {/* Slider Section */}
     {/*  <section className="slidersection">
        <img src="image/slider.png" alt="" />
      </section> */}
      <SliderSection/>

      {/* First Section */}
      <section className="firstsection">
        <div className="firstsection_title" onClick={test}>
          <h3>
            Add our <span>Newest</span> Collection
          </h3>
        </div>
        <div className="firstsection_content">
          <div className="row">
          {loadingTopProducts
              ? Array(4)
                  .fill(0)
                  .map((_, index) => <React.Fragment key={index}>{renderSkeletonCard()}</React.Fragment>)
              : topProducts.map((item) => (


<>
<Helmet>
        <title>{item?.meta__title}</title>
        <meta
          name="description"
          content={item?.meta__description}
        />
      </Helmet>
                  <div
                    className="col-md-3 col-6"
                    key={item.product_id}
                    onClick={() => {
                      handleProductClick(item.product_id);
                    }}
                  >
                    <div className="firstsection_card">
                      <img src={`${serverURL}images/${item.image_url}`} alt="" />
                      <label>
                        {item.name}
                        <br />
                      </label>
                      
                      <div className="firsteccard__prices">
                      <p>₹{item.current_price}</p>
                      <span>₹ {item.base_price}</span>
                      
                      <p>₹{item.base_price- item.current_price} OFF</p>
                      </div>
                      
                    </div>
                  </div></>
                ))}
          </div>
        </div>
      </section>
      

      {/* Second Section */}
      <section className="secondsection">
        <div className="secondsection_image">
          <img src="image/secondsection.png" alt="" />
        </div>
      </section>

      {/* Third Section */}
      <section className="thirdsection">
        <div className="thirdsection_title">
          <h3>
            <span>Men</span> Collection
          </h3>
          <p>Uncover the latest in men's fashion</p>
        </div>
        <div className="thirdsection_content">
          <div className="row">
          {loadingTopProductsMan
              ? Array(4)
                  .fill(0)
                  .map((_, index) => <React.Fragment key={index}>{renderSkeletonCard()}</React.Fragment>)
              : topProductsMan.map((item) => (
                  <div
                    className="col-md-3 col-6"
                    key={item.product_id}
                    onClick={() => {
                      handleProductClick(item.product_id);
                    }}
                  >
                    <div className="thirdsection_card">
                      <img src={`${serverURL}images/${item.image_url}`} alt="" />
                      <div className="bottomtitles">
                        <p>{item.name}</p>
                        <div className="bottomprices">
                          <p>{item.base_price}</p> <p>₹ {item.current_price}</p>
                          <p>₹ {item.base_price - item.current_price} OFF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            <div className="sectionthird_button">
              <button onClick={()=>{ navigate(`/category/men/All`)}} >View All</button>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section */}
      <section className="forthsection">
        <div className="forthsection_image">
          <img src="image/forthsection.png" alt="" />
        </div>
      </section>

      {/* Women Section */}
      <section className="thirdsection">
        <div className="thirdsection_title">
          <h3>
            Shop <span>Women</span>
          </h3>
          <p>Uncover the latest in Women's fashion</p>
        </div>
        <div className="thirdsection_content">
          <div className="row">
          {loadingTopProductsWomen
              ? Array(4)
                  .fill(0)
                  .map((_, index) => <React.Fragment key={index}>{renderSkeletonCard()}</React.Fragment>)
              : topProductsWomen.map((item) => (
                  <div
                    className="col-md-3 col-6"
                    key={item.product_id}
                    onClick={() => {
                      handleProductClick(item.product_id);
                    }}
                  >
                    <div className="thirdsection_card">
                      <img src={`${serverURL}images/${item.image_url}`} alt="" />
                      <div className="bottomtitles">
                        <p>{item.name}</p>
                        <div className="bottomprices">
                          <p>₹ {item.base_price?item.base_price:344}</p> <p>₹ {item.current_price?item.current_price:322}</p>
                          <p>₹ {item.base_price - item.current_price} OFF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            <div className="sectionthird_button">
              <button onClick={()=>{ navigate(`/category/women/All`)}} >View All</button>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
