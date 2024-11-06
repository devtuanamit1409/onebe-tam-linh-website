"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css"; // Cơ bản CSS
import "swiper/css/navigation"; // CSS cho module Navigation
import Image from "next/image";
import { Swiper as SwiperClass } from "swiper";
import IconNextCricle from "../icons/IconNextCricle";
import IconPrevCricle from "../icons/IconPrevCricle";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface TintucNoibatProps {
  name: string;
  data: any;
}

const TintucNoibat: React.FC<TintucNoibatProps> = ({ name, data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const t = useTranslations("home");
  const translate = useTranslations("detail_post");
  const baseUrl = process.env.URL_API || ""; // Ensure baseUrl is defined

  const onPrev = (): void => {
    swiperRef.current?.slidePrev();
  };

  const onNext = (): void => {
    swiperRef.current?.slideNext();
  };

  return (
    <>
      <p className="font-bold text-[32px]">{name}</p>
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
        {data.map((item: any, key: any) => {
          const imageUrl = item?.seo?.thumbnail?.data?.attributes?.url
            ? `${baseUrl}${item.seo.thumbnail.data.attributes.url}`
            : "/path/to/default-image.jpg"; // Fallback image if URL is missing

          return (
            <SwiperSlide key={item.id}>
              <div className="laptop:min-h-[820px] laptop:h-[820px] tablet:min-h-[686px] tablet:h-[686px] mobile:min-h-[670px] mobile:h-[670px]">
                <div className="py-[16px] relative overflow-hidden desktop:h-full min-h-[400px] max-h-[400px]">
                  <Image
                    src={imageUrl}
                    layout="fill"
                    objectFit="cover"
                    alt="tin-tuc-tieu-diem"
                    className="mobile:rounded-xl desktop:rounded-none desktop:w-full"
                  />
                </div>
                <h2 className="desktop:text-[40px] mt-4 laptop:text-[28px] mobile:text-[18px] laptop:leading-[56px] mobile:leading-[25.2px] tablet:text-[#374151] mobile:text-black font-bold line-clamp-2">
                  {item.title}
                </h2>
                <p className="tablet:my-[24px] mobile:my-4 desktop:text-[24px] laptop:text-[20px] mobile:text-base tablet:text-[#8899A8] laptop:leading-[38.4px] mobile:text-black line-clamp-5">
                  {item?.seo?.description || ""}
                </p>
                <button className="text-[#3B559E] border border-[#3B559E] font-bold bg-transparent px-[24px] py-[12px] flex items-center rounded-[50px] absolute bottom-1">
                  <Link
                    href={item.slug ? `/${item.slug}` : "/"}
                    className="mr-[10px]"
                  >
                    {t("let_see")}
                  </Link>
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="py-[24px] flex gap-[10px]">
        <button onClick={onPrev}>
          <IconPrevCricle active={currentIndex > 0} />
        </button>
        <button onClick={onNext}>
          <IconNextCricle active={currentIndex < totalSlides - 1} />
        </button>
      </div>
    </>
  );
};

export default TintucNoibat;
