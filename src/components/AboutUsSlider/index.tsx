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

const AboutUsSlider = () => {
  const data = [
    {
      image: {
        src: "images/svg-home/water.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      title: " Sản phẩm",
      description:
        "  NTS Engineering với đội ngũ chuyên gia luôn tìm tòi các sản phẩm plastic nhằm nâng cao hiệu quả công nghệ xử lý nước thải, xử lý nước cấp.",
      url: "/",
    },
    {
      image: {
        src: "images/svg-home/garden.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      title: "Dịch vụ",
      description:
        "  NTS Engineering với đội ngũ chuyên gia luôn tìm tòi các sản phẩm plastic nhằm nâng cao hiệu quả công nghệ xử lý nước thải, xử lý nước cấp.",
      url: "/",
    },
    {
      image: {
        src: "images/svg-home/quill.svg",
        alt: "icon",
        width: 32,
        height: 32,
      },
      title: "Dự án cộng đồng",
      description:
        "Mang nước sạch cho cộng đồng được xem là nghĩa vụ và trách nhiệm của chúng tôi khi hoạt động trong lĩnh vực nước. Đây là cơ hội để chúng tôi được chia sẻ với những vùng đất, con người khó khăn.",
      url: "/",
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
        className="mySwiper">
        {data?.map((item, index) => (
          <SwiperSlide
            className={`col-span-12 laptop:col-span-4 background-about-${index} min-h-[398px] min-w-[300px]`}
            key={index}>
            <div className="overflow-hidden tablet:h-[437px] ">
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
                    href={item.url}
                    className="btn-more py-[12px] px-[24px] text-[#28A645]  bg-[#fff] rounded-[50px] border border-[#fff]  hover:bg-[#E8FBF6] hover:border-[#28A645] ">
                    Xem thêm
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
