import React from "react";
import Image from "next/image";
import "../../styles/pages/tin-tuc.css";
import TintucNoibat from "@/components/TintucNoibat/TintucNoibat";
import demo_tin_tuc_2 from "../../../public/images/tin-tuc/demo-tin-tuc-2.jpg";
import IconSearch from "@/components/icons/IconSearch";
import IconWater from "@/components/icons/IconWater";
import IconDesign from "@/components/icons/IconDesign";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";

import demo_goc_chuyen_gia from "../../../public/images/goc-chuyen-gia/demo_chuuyen_gia.png";
const page = () => {
  const tin_tuc_noi_bat = [
    {
      category: "Xử lý nước",
      title: "Quản lý hoạt động tái sử dụng nước thải doanh...",
      description:
        "A Viewpoint by Davide S., Delivery Director, Aina P., Consultant, and...",
      image: demo_tin_tuc_2,
    },
    {
      category: "Xử lý nước",
      title: "Quản lý hoạt động tái sử dụng nước thải doanh...",
      description:
        "A Viewpoint by Davide S., Delivery Director, Aina P., Consultant, and...",
      image: demo_tin_tuc_2,
    },
    {
      category: "Xử lý nước",
      title: "Quản lý hoạt động tái sử dụng nước thải doanh...",
      description:
        "A Viewpoint by Davide S., Delivery Director, Aina P., Consultant, and...",
      image: demo_tin_tuc_2,
    },
  ];
  const data_tin_tuc = [
    {
      url: "/images/tin-tuc/tin-tuc-1.jpg",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-2.jpg",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-3.jpg",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-1.jpg",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-2.jpg",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-3.jpg",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];
  const data_detail = [
    {
      image: demo_goc_chuyen_gia,
      title:
        "Tiến sĩ Lâm Vừ Thanh Nội – Chuyên gia cố vấn Công nghệ môi trường",
      describe:
        "Làm việc, nghiên cứu và giảng dạy trong lĩnh vực môi trường từ năm 2001, TS. Nội là một trong những chuyên gia cố vấn công nghệ môi trường hàng đầu của NTS.",
    },
    {
      image: demo_goc_chuyen_gia,
      title:
        "Tiến sĩ Lâm Vừ Thanh Nội – Chuyên gia cố vấn Công nghệ môi trường",
      describe:
        "Làm việc, nghiên cứu và giảng dạy trong lĩnh vực môi trường từ năm 2001, TS. Nội là một trong những chuyên gia cố vấn công nghệ môi trường hàng đầu của NTS.",
    },
    {
      image: demo_goc_chuyen_gia,
      title:
        "Tiến sĩ Lâm Vừ Thanh Nội – Chuyên gia cố vấn Công nghệ môi trường",
      describe:
        "Làm việc, nghiên cứu và giảng dạy trong lĩnh vực môi trường từ năm 2001, TS. Nội là một trong những chuyên gia cố vấn công nghệ môi trường hàng đầu của NTS.",
    },
  ];
  return (
    <>
      <div className="container py-[50px]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 desktop:col-span-6">
            <TintucNoibat data={data_detail} name="Tin tức nổi bật" />
          </div>
          <div className="col-span-12 desktop:col-span-6">
            <h2 className="text-[24px] font-bold text-[#374151]">
              Tin mới lên
            </h2>
            {tin_tuc_noi_bat.map((item, key) => {
              return (
                <div key={key} className="py-[16px]">
                  <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                    <div className="col-span-7">
                      <div className="flex flex-col gap-[16px]">
                        <div className="w-24 h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
                          <div className="text-indigo-800 text-base font-normal leading-normal">
                            {item.category}
                          </div>
                        </div>
                        <h3 className="text-[20px] text-[#374151] font-[500]">
                          {item.title}
                        </h3>
                        <p className="text-[18px] text-[#8899A8]">
                          {item.description}
                        </p>
                        <div className="flex justify-start">
                          <button className="text-[#3B559E] px-[24px] py-[8px] rounded-[50px] btn-view">
                            Đọc ngay
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-5">
                      <div className="">
                        <Image
                          height={196}
                          width={196}
                          src={demo_tin_tuc_2}
                          layout="responsive"
                          alt="tin-tuc-moi-len"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-[40px]">
          <hr />
        </div>

        <div className="flex justify-between flex-wrap ">
          <div>
            <h2 className="text-[35px] font-bold">Tất cả bài viết</h2>
          </div>
          <div className="relative">
            <input
              className="focus:outline-none p-[24px] rounded-[56px] border border-[#DFE4EA] bg-[#FFFFFF] placeholder:font-[300] placeholder:italic placeholder:text-[#8899A8]"
              placeholder="Nhập từ khóa tìm kiếm"
            />
            <button className="w-[56px] h-[56px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[2%] top-[10%]">
              <IconSearch />
            </button>
          </div>
        </div>

        <div className="py-[50px]">
          <div className="flex">
            <button className="bg-[#3B559E] py-[8px] px-[10px] flex items-center rounded-[24px] border border-[#3B559E]">
              <IconWater />
              <span className="text-12px font-medium text-[#fff] ml-[8px]">
                Xử lý nước
              </span>
            </button>
            <button className="bg-[#fff] py-[8px] px-[10px] flex items-center rounded-[24px] ml-[8px] border  border-[#3B559E]">
              <IconDesign />
              <span className="text-12px font-medium text-[#3B559E] ml-[8px]">
                Thiết kế cơ điện
              </span>
            </button>
          </div>
        </div>

        <BoxTinTuc data={data_tin_tuc} />
        <div className="py-[40px] flex justify-center">
          <button className="py-[16px] px-[24px] bg-[#3B559E] border border-[#3B559E] text-[#fff] font-medium rounded-[50px]">
            Tải thêm bài viết
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
