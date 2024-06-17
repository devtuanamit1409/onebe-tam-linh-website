"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Marquee from "react-marquee-slider";
import Loading from "../Loading";
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
const handleInit = () => {
  return <Loading />;
};
const handleFinish = () => {};

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
    <div className="sliderContainer overflow-hidden max-h-[100px]">
      <Marquee
        velocity={80}
        resetAfterTries={200}
        direction="rtl"
        scatterRandomly={false}
        onInit={handleInit}
        onFinish={handleFinish}>
        {listlogo.listlogo.map((logo, index) => (
          <div key={index} className="logo-item mx-4">
            <Image
              src={`${baseUrl}${logo.urlImage.data.attributes.url}`}
              alt={logo.alt}
              layout="responsive"
              width={100}
              height={50}
              // objectFit="contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default SliderKhachHang;
