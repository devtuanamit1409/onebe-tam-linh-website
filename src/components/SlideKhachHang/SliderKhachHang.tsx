"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

interface ListLogoprops {
  listlogo: listLogo[];
}
interface listLogo {
  id: number;
  alt: string;
  urlImage: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

const SliderKhachHang = (listlogo: ListLogoprops) => {
  const baseUrl = process.env.URL_API;
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
    <div className="sliderContainer ">
      <Swiper
        // slidesPerView={1}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={2000}
        freeMode={true}
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
        // modules={[Autoplay]}
        className="mySwiper branding-slider">
        {listlogo.listlogo?.map((item: any) => (
          <SwiperSlide
            key={item?.id}
            className="!flex items-center justify-center min-h-[50px] branding-slide">
            <img
              src={`${baseUrl}${item?.urlImage?.data?.attributes?.url}`}
              alt="logo"
              width="full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderKhachHang;
