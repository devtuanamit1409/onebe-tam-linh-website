"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import IconArrowRight from "../icons/IconArrowRight";
import IconCircleArrowLeft from "../icons/IconCircleArrowLeft";
import IconCircleArrowRight from "../icons/IconCircleArrowRight";
import { useTranslations } from "next-intl";
import sp from "../../../public/images/home/sp.png";
import React from "react";
interface boxServiceProps {
  id: number;
  title?: string;
  description?: string;
  path: string;
}
interface AboutUsSliderProps {
  dataBoxService: boxServiceProps[];
  locale: string; // Assuming locale is a string
}

const AboutUsSlider: React.FC<AboutUsSliderProps> = ({
  dataBoxService,
  locale,
}) => {
  const t = useTranslations("home");

  const data = [
    {
      image: {
        src: "images/svg-home/water.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      title: dataBoxService[0]?.title || "english title",
      description: dataBoxService[0]?.description || "english description",
      url: dataBoxService[0]?.path || "/san-pham",
    },
    {
      image: {
        src: "images/svg-home/garden.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      title: dataBoxService[1]?.title || "english title",
      description: dataBoxService[1]?.description || "English description",
      url: dataBoxService[1]?.path || "/dich-vu",
    },
    {
      image: {
        src: "images/svg-home/quill.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      title: dataBoxService[2]?.title || "english title",
      description: dataBoxService[2]?.description || "english description",
      url: dataBoxService[2]?.path || "/du-an",
    },
  ];

  return (
    <div className=" gap-[24px] mt-[112px] desktop:overflow-hidden ">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        navigation={{
          prevEl: ".slider-prev",
          nextEl: ".slider-next",
        }}
        loop={true}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {dataBoxService &&
          data?.map((item, index) => (
            <SwiperSlide
              className={`col-span-12 laptop:col-span-4 background-about-${index} min-h-[398px] min-w-[300px] max-w-[330px] relative`}
              key={index}
            >
              <div className="overflow-hidden tablet:h-[437px] ">
                {/* <Image src={sp.src} alt="alt" layout="fill" /> */}
                <div className="p-[32px] ">
                  <div className="bg-[#fff] w-[60px] h-[60px] rounded-[100px] flex justify-center items-center mx-0">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                    />
                  </div>
                  <h4 className="pt-[16px] text-[24px] font-bold text-[#fff]">
                    {item.title}
                  </h4>
                  <p className="text-[16px] pt-[16px] text-[#fff] h-[182px] relative z-40">
                    {item.description}
                  </p>
                  <div className="pt-[16px]">
                    <Link
                      href={`/${locale}${item.url}`}
                      className="btn-more py-[12px] px-[24px] text-[#28A645]  bg-[#fff] rounded-[50px] border border-[#fff]  hover:bg-[#E8FBF6] hover:border-[#28A645] "
                    >
                      {t("see_more")}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="controll-block mobile:flex laptop:hidden justify-center gap-6 mt-4 ">
        <div className="slider-prev text-[#3B559E]">
          <IconCircleArrowLeft />
        </div>
        <div className="slider-next text-[#3B559E]">
          <IconCircleArrowRight />
        </div>
      </div>
    </div>
  );
};

export default AboutUsSlider;
