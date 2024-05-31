"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const SliderKhachHang = () => {
  const imagesUrl = [
    "images/logoDoiTac/logo1.png",
    "images/logoDoiTac/logo2.png",
    "images/logoDoiTac/logo3.svg",
    "images/logoDoiTac/logo4.png",
    "images/logoDoiTac/logo5.png",
    "images/logoDoiTac/logo6.png",
    "images/logoDoiTac/logo1.png",
    "images/logoDoiTac/logo2.png",
    "images/logoDoiTac/logo3.svg",
    "images/logoDoiTac/logo4.png",
    "images/logoDoiTac/logo5.png",
    "images/logoDoiTac/logo6.png",
  ];
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper">
        {imagesUrl.map((url, index) => (
          <SwiperSlide
            key={index}
            className="!flex items-center justify-center min-h-[50px]">
            <img src={url} alt="logo" width="full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SliderKhachHang;
