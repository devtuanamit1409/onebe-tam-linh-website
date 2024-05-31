"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import data_banner from "./data";
import ProgressBar from "../ProgressBar/ProgressBar";

const SlideHome = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const labels = data_banner.map((item) => item.name);
  console.log(data_banner);
  return (
    <>
      <Swiper
        spaceBetween={30}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        effect={"fade"}
        modules={[EffectFade, Pagination, Autoplay]}
        className="swiper-home relative"
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}>
        {data_banner.map((item) => (
          <SwiperSlide key={item.key}>
            <div className="image-container">
              <Image
                src={item.urlImage}
                alt="Slide Home"
                layout="responsive"
                width={1000}
                height={1000}
              />
              <div
                className={`content-baner-${item.key} flex justify-center desktop:items-center mobile:pt-[60px]`}>
                <div className="w-[90%] laptop:w-[846px]">
                  <div className="grid grid-cols-1 gap-[32px]">
                    <div className="col-span-1">
                      <button className="rounded-[32px] py-[12px] px-[24px] text-white border border-white">
                        {item.name}
                      </button>
                    </div>
                    <div className="col-span-1">
                      <h1 className="text-[28px] laptop:text-[48px] mobile:text-[24px] font-bold text-white">
                        {item.title}
                      </h1>
                    </div>
                    <div className="col-span-1">
                      <p className="text-white tablet:text-[18px] mobile:text-[14px]">
                        {item.describe}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <button className="rounded-[32px] py-[12px] font-medium px-[24px] bg-white text-black border border-white hover:text-white hover:bg-transparent">
                        Xem thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="flex justify-center items-center py-4 container">
          <div className="laptop:w-[846px] tablet:w-full container mobile:pr-[32px] mobile:pl-[32px]  absolute tablet:bottom-[20%] mobile:bottom-[86px]  z-30">
            <ProgressBar
              currentIndex={currentIndex}
              stepsCount={data_banner.length}
              labels={labels}
            />
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default SlideHome;
