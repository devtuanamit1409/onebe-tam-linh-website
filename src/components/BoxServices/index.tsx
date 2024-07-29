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
import du from "../../../public/images/home/du.png";
import dv from "../../../public/images/home/dv.png";
import React from "react";
interface boxServiceProps {
  id: number;
  title?: string;
  title_color?: string;
  title_style?: string;
  description?: string;
  description_style?: string;
  description_color?: string;
  path: string;
  image?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}
interface AboutUsSliderProps {
  dataBoxService: boxServiceProps[];
  locale: string; // Assuming locale is a string
}

const Boxservices: React.FC<AboutUsSliderProps> = ({
  dataBoxService,
  locale,
}) => {
  const t = useTranslations("home");
  const baseUrl = process.env.URL_API;
  const data = [
    {
      image: {
        src: "images/svg-home/water.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      background: dataBoxService[0]?.image?.data.attributes.url
        ? `${baseUrl}${dataBoxService[0]?.image?.data.attributes.url}`
        : sp,
      title: dataBoxService[0]?.title || "english title",
      titleStyle: dataBoxService[0]?.title_style || "normal",
      titleColor: dataBoxService[0]?.title_color || "#fff",
      description: dataBoxService[0]?.description || "english description",
      descriptionStyle: dataBoxService[0]?.description_style || "normal",
      descriptionColor: dataBoxService[0]?.description_color || "#fff",
      url: dataBoxService[0]?.path || "/san-pham",
    },
    {
      image: {
        src: "images/svg-home/garden.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      background: dataBoxService[1]?.image?.data.attributes.url
        ? `${baseUrl}${dataBoxService[1]?.image?.data.attributes.url}`
        : dv,
      title: dataBoxService[1]?.title || "english title",
      titleStyle: dataBoxService[1]?.title_style || "normal",
      titleColor: dataBoxService[1]?.title_color || "#fff",
      description: dataBoxService[1]?.description || "English description",
      descriptionStyle: dataBoxService[1]?.description_style || "normal",
      descriptionColor: dataBoxService[1]?.description_color || "#fff",
      url: dataBoxService[1]?.path || "/dich-vu",
    },
    {
      image: {
        src: "images/svg-home/quill.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      background: dataBoxService[2]?.image?.data.attributes.url
        ? `${baseUrl}${dataBoxService[2]?.image?.data.attributes.url}`
        : du,
      title: dataBoxService[2]?.title || "english title",
      titleStyle: dataBoxService[2]?.title_style || "normal",
      titleColor: dataBoxService[2]?.title_color || "#fff",
      description: dataBoxService[2]?.description || "english description",
      descriptionStyle: dataBoxService[2]?.description_style || "normal",
      descriptionColor: dataBoxService[2]?.description_color || "#fff",
      url: dataBoxService[2]?.path || "/du-an",
    },
  ];

  const handleRenderStyle = (style: string) => {
    switch (style) {
      case "In đậm":
        return "font-bold";
      case "Nghiêng":
        return "italic";
      case "In đậm + nghiêng":
        return "font-bold italic";
      case "In đậm + gạch chân":
        return "font-bold underline";
      case "Gạch chân + nghiêng":
        return "underline italic";
      case "In đậm + nghiêng + gạch chân":
        return "font-bold italic underline";
      default:
        return "font-normal";
    }
  };

  return (
    <div className=" gap-[24px] mt-[112px] desktop:overflow-hidden ">
      {dataBoxService && (
        <Swiper
          slidesPerView={"auto"}
          // spaceBetween={10}
          // slidesPerGroupSkip={1}
          centeredSlides={false}
          speed={800}
          navigation={{
            prevEl: ".slider-prev",
            nextEl: ".slider-next",
          }}
          loop={false}
          grabCursor={true}
          breakpoints={{
            360: {
              spaceBetween: 16,
            },

            1024: {
              spaceBetween: 20,
            },
            1440: {
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="about-us-slider">
          {data?.map((item, index) => {
            console.log(`item + ${index}`, item);
            return (
              <SwiperSlide
                className={`min-h-[398px] max-h-[436px] min-w-[330px] w-[330px] max-w-[330px] relative`}
                key={index}>
                <div className="overflow-hidden tablet:h-[437px] relative ">
                  <Image
                    src={item.background}
                    alt="alt"
                    layout="fill"
                    objectFit="cover"
                    className="z-1"
                  />
                  <div className="p-[32px] h-full relative z-1">
                    <h2
                      className={`pt-[76px] text-[24px] ${handleRenderStyle(
                        item.titleStyle
                      )} line-clamp-2`}
                      style={{ color: item.titleColor }}>
                      {item.title}
                    </h2>
                    <p
                      className={`text-[16px] pt-[16px] h-[182px] relative z-30 line-clamp-7 ${handleRenderStyle(
                        item.descriptionStyle
                      )}`}
                      style={{ color: item.descriptionColor }}>
                      {item.description}
                    </p>
                    <div className="mobile:mt-[16px] tablet:mt-[44px]">
                      <Link
                        href={item.url ? item.url : "/"}
                        className="btn-more py-[12px] px-[24px] font-bold text-white   bg-[#28A645] rounded-[50px] border border-[#28A645]   ">
                        {t("see_more")}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

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

export default Boxservices;
