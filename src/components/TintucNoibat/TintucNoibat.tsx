"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css"; // Cơ bản CSS
import "swiper/css/navigation"; // CSS cho module Navigation
import Image from "next/image";
import demo_tin_tuc from "../../../public/images/tin-tuc/demo-tin-tuc.jpg";
import { Swiper as SwiperClass } from "swiper";
import IconNextCricle from "../icons/IconNextCricle";
import IconPrevCricle from "../icons/IconPrevCricle";
const TintucNoibat: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const onPrev = (): void => {
    swiperRef.current?.slidePrev();
  };

  const onNext = (): void => {
    swiperRef.current?.slideNext();
  };
  return (
    <>
      <h2 className="font-bold text-[32px]">Bài viết tiêu điểm</h2>
      <Swiper
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTotalSlides(swiper.slides.length);
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
        }}
      >
        <SwiperSlide>
          <div>
            <div className="py-[24px] relative">
              <Image
                src={demo_tin_tuc}
                layout="responsive"
                width={100}
                height={100}
                alt="tin-tuc-tieu-diem"
              />
              <div className="absolute top-[15%] left-[5%]">
                <span className="text-[18px] py-[16px] px-[24px] time-up font-bold">
                  Mới đây
                </span>
              </div>
            </div>
            <h1 className="text-[40px] text-[#374151] font-bold">
              Công nghệ lọc sinh học nhỏ giọt - Thiết kế mới tối ưu dành cho môi
              trường
            </h1>
            <p className="py-[24px] text-[24px] text-[#8899A8]">
              Làm việc, nghiên cứu và giảng dạy trong lĩnh vực môi trường từ năm
              2001, TS. Nội là một trong những chuyên gia cố vấn công nghệ môi
              trường hàng đầu của NTS.
            </p>
            <button className="text-[#fff] bg-[#3B559E] px-[24px] py-[12px] flex items-center rounded-[50px] ">
              <span className="mr-[10px]">Xem chi tiết</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
              >
                <path
                  d="M0.96875 15.9062C0.78125 15.9062 0.625 15.8438 0.46875 15.7188C0.1875 15.4375 0.1875 15 0.46875 14.7188L7.03125 8L0.46875 1.3125C0.1875 1.03125 0.1875 0.59375 0.46875 0.3125C0.75 0.03125 1.1875 0.03125 1.46875 0.3125L8.53125 7.5C8.8125 7.78125 8.8125 8.21875 8.53125 8.5L1.46875 15.6875C1.34375 15.8125 1.15625 15.9062 0.96875 15.9062Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="py-[24px] relative">
              <Image
                src={demo_tin_tuc}
                layout="responsive"
                width={100}
                height={100}
                alt="tin-tuc-tieu-diem"
              />
              <div className="absolute top-[15%] left-[5%]">
                <span className="text-[18px] py-[16px] px-[24px] time-up font-bold">
                  Mới đây
                </span>
              </div>
            </div>
            <h1 className="text-[40px] text-[#374151] font-bold">
              Công nghệ lọc sinh học nhỏ giọt - Thiết kế mới tối ưu dành cho môi
              trường
            </h1>
            <p className="py-[24px] text-[24px] text-[#8899A8]">
              Làm việc, nghiên cứu và giảng dạy trong lĩnh vực môi trường từ năm
              2001, TS. Nội là một trong những chuyên gia cố vấn công nghệ môi
              trường hàng đầu của NTS.
            </p>
            <button className="text-[#fff] bg-[#3B559E] px-[24px] py-[12px] flex items-center rounded-[50px] ">
              <span className="mr-[10px]">Xem chi tiết</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
              >
                <path
                  d="M0.96875 15.9062C0.78125 15.9062 0.625 15.8438 0.46875 15.7188C0.1875 15.4375 0.1875 15 0.46875 14.7188L7.03125 8L0.46875 1.3125C0.1875 1.03125 0.1875 0.59375 0.46875 0.3125C0.75 0.03125 1.1875 0.03125 1.46875 0.3125L8.53125 7.5C8.8125 7.78125 8.8125 8.21875 8.53125 8.5L1.46875 15.6875C1.34375 15.8125 1.15625 15.9062 0.96875 15.9062Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="py-[24px] relative">
              <Image
                src={demo_tin_tuc}
                layout="responsive"
                width={100}
                height={100}
                alt="tin-tuc-tieu-diem"
              />
              <div className="absolute top-[15%] left-[5%]">
                <span className="text-[18px] py-[16px] px-[24px] time-up font-bold">
                  Mới đây
                </span>
              </div>
            </div>
            <h1 className="text-[40px] text-[#374151] font-bold">
              Công nghệ lọc sinh học nhỏ giọt - Thiết kế mới tối ưu dành cho môi
              trường
            </h1>
            <p className="py-[24px] text-[24px] text-[#8899A8]">
              Làm việc, nghiên cứu và giảng dạy trong lĩnh vực môi trường từ năm
              2001, TS. Nội là một trong những chuyên gia cố vấn công nghệ môi
              trường hàng đầu của NTS.
            </p>
            <button className="text-[#fff] bg-[#3B559E] px-[24px] py-[12px] flex items-center rounded-[50px] ">
              <span className="mr-[10px]">Xem chi tiết</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
              >
                <path
                  d="M0.96875 15.9062C0.78125 15.9062 0.625 15.8438 0.46875 15.7188C0.1875 15.4375 0.1875 15 0.46875 14.7188L7.03125 8L0.46875 1.3125C0.1875 1.03125 0.1875 0.59375 0.46875 0.3125C0.75 0.03125 1.1875 0.03125 1.46875 0.3125L8.53125 7.5C8.8125 7.78125 8.8125 8.21875 8.53125 8.5L1.46875 15.6875C1.34375 15.8125 1.15625 15.9062 0.96875 15.9062Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </SwiperSlide>
        <div className="py-[24px] flex gap-[10px]">
          <button onClick={onPrev}>
            <IconPrevCricle active={currentIndex === 0 ? false : true} />
          </button>
          <button onClick={onNext}>
            <IconNextCricle
              active={currentIndex === totalSlides - 1 ? false : true}
            />
          </button>
        </div>
      </Swiper>
    </>
  );
};

export default TintucNoibat;
