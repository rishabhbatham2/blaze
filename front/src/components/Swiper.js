import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Swiper.css";
import { postData, serverURL } from "../services/NodeServices";
// Ensure postData function is correctly imported

export default function SliderSection() {
  const [images, setImages] = useState([]);

  const getCurrentImages = async () => {
    try {
      const result = await postData("api/products/getbanners");
      if (result.status) {
        updateImages(result.banners);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const updateImages = (banners) => {
    const width = window.innerWidth;
    let selectedImages = [];

    if (width <= 480) {
      selectedImages = banners.set3.split(",");
    } else if (width <= 850) {
      selectedImages = banners.set2.split(",");
    } else {
      selectedImages = banners.set1.split(",");
    }

    setImages(selectedImages);
  };

  useEffect(() => {
    getCurrentImages();
    window.addEventListener("resize", () => getCurrentImages());

    return () => {
      window.removeEventListener("resize", () => getCurrentImages());
    };
  }, []);

  return (
    <section className="slidersection">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
          <a href="/clanfest">
          <img src={`${serverURL}images/${image}`} alt={`Slide ${index + 1}`} width={2048} height={"100vh"} />
          </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
