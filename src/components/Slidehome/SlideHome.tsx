"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import ProgressBar from "../ProgressBar/ProgressBar";

interface BannerItem {
  id: string;
  urlImage: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  title: string;
  path: string;
  name: string;
  description: string;
}

const SlideHome = ({ banner }: { banner: BannerItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const labels = banner?.map((item) => item.name);
  // console.log(banner);
  const baseUrl = process.env.URL_API;
  // console.log(baseUrl);
  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        modules={[EffectFade, Pagination, Autoplay]}
        className="swiper-home relative"
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}>
        {banner?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="image-container">
              <Image
                src={`${baseUrl}${item.urlImage.data.attributes.url}`}
                alt="Slide Home"
                layout="responsive"
                width={1000}
                height={1000}
              />
              <div
                className={`content-baner-${item.id} flex justify-center desktop:items-center mobile:pt-[60px]`}>
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
                        {item.description}
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
          <div className="laptop:w-[846px] tablet:w-full container mobile:pr-[32px] mobile:pl-[32px] absolute tablet:bottom-[20%] mobile:bottom-[86px] z-30">
            <ProgressBar
              currentIndex={currentIndex}
              stepsCount={banner?.length}
              labels={labels}
            />
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default SlideHome;
