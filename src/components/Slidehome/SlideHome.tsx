"use client";
import React, { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useTranslations } from "next-intl";
import Link from "next/link";

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

  // Lọc các item hợp lệ (các item có `title`, `description`, hoặc `urlImage`)
  const filteredBanner = banner.filter(
    (item) =>
      item.title || item.description || item.urlImage?.data?.attributes?.url
  );

  const labels = filteredBanner?.map((item) => item.name);

  const baseUrl = process.env.URL_API;
  const t = useTranslations("home");
  console.log("Filtered banner", filteredBanner);

  return (
    <>
      <Swiper
        allowTouchMove={false}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        modules={[EffectFade, Pagination, Autoplay]}
        className="swiper-home relative"
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {filteredBanner?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="image-container">
              <Image
                src={`${baseUrl}${item.urlImage?.data?.attributes?.url}` || "/"}
                alt="Slide Home"
                layout="fill"
                priority
                objectFit="cover"
              />
              <div
                className={`content-baner flex justify-center desktop:items-center mobile:pt-[60px]`}
              >
                <div className="w-[90%] laptop:w-[846px]">
                  <div className="grid grid-cols-1 gap-[32px]">
                    <div className="col-span-1">
                      <p className="py-[4px] text-white w-fit border-b border-white">
                        {item.name}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <h2 className="text-[28px] laptop:text-[48px] mobile:text-[24px] font-bold text-white line-clamp-2 laptop:min-h-[144px] tablet:min-h-[72px] mobile:min-h-[72px]">
                        {item.title}
                      </h2>
                    </div>
                    <div className="col-span-1">
                      <p className="text-white tablet:text-[18px] mobile:text-[14px] line-clamp-2 laptop:min-h-[54px] tablet:min-h-[54px] mobile:min-h-[42px]">
                        {item.description}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <Link
                        href={item.path ? item.path : "/"}
                        className="rounded-[32px] py-[12px] font-bold px-[24px] bg-[#28A645] text-white border border-[#28A645] hover:text-white hover:bg-transparent transition-all 300ms"
                      >
                        {t("see_more")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* <div className="flex justify-center items-center container">
          <div className="laptop:w-[846px] tablet:w-full container mobile:pr-[32px] mobile:pl-[32px] desktop:pl-0 absolute tablet:top-1/2 mobile:bottom-[86px] translate-y-[70%] z-30">
            <ProgressBar
              currentIndex={currentIndex}
              stepsCount={filteredBanner?.length}
              labels={labels}
            />
          </div>
        </div> */}
      </Swiper>
    </>
  );
};

export default SlideHome;
