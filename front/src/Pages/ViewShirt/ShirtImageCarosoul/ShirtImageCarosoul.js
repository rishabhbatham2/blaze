import React, { useState } from "react";
import "./ShirtImageCarosouls.css"; // Make sure to style this component

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { serverURL } from "../../../services/NodeServices";


export default function ShirtImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="shirtimage__cont">
      <div className="slider">
        <button className="slider__btn slider__btn--left" onClick={handlePrev}>
          &#8249;
        </button>
        <div className="slider__image-wrapper">
          <img
            src={`${serverURL}/images/${images[currentIndex]}`}
            alt={`Slide ${currentIndex + 1}`}
            className="slider__image"
            width={361} height={540}
            
          />
        </div>
        <button className="slider__btn slider__btn--right" onClick={handleNext}>
          &#8250;
        </button>
      </div>
      <div className="slidermobile">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        
      >
      {images&&images.length!=0&&images.map((item)=>{
        return(
          <SwiperSlide>
         {!isLoaded && <div className="placeholder"></div>}

          <img  src={`${serverURL}images/${images[0]}`} alt="Slide 1" style={{borderRadius:11}}
          
          width={361} height={540}
          
          
          />
        </SwiperSlide>
        )
      })}
      
      </Swiper>
      </div>
    </div>
  );
}
