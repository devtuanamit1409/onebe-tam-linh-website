import React from "react";
import Image from "next/image";
import "../../styles/pages/tin-tuc.css";
import TintucNoibat from "@/components/TintucNoibat/TintucNoibat";
import demo_tin_tuc_2 from "../../../public/tin-tuc/demo-tin-tuc-2.jpg";

const page = () => {
  return (
    <>
      <div className="container py-[50px]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <TintucNoibat />
          </div>
          <div className="col-span-6">
            <h2 className="text-[24px] font-bold text-[#374151]">
              Tin mới lên
            </h2>
            <div className="py-[16px]">
              <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                <div className="col-span-7">
                  <div className="flex flex-col gap-[16px]">
                    <div className="w-24 h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
                      <div className="text-indigo-800 text-base font-normal leading-normal">
                        Xử lý nước
                      </div>
                    </div>
                    <h3 className="text-[20px] text-[#374151] font-[500]">
                      Quản lý hoạt động tái sử dụng nước thải doanh...
                    </h3>
                    <p className="text-[18px] text-[#8899A8]">
                      A Viewpoint by Davide S., Delivery Director, Aina P.,
                      Consultant, and...
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
            <div className="py-[16px]">
              <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                <div className="col-span-7">
                  <div className="flex flex-col gap-[16px]">
                    <div className="w-24 h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
                      <div className="text-indigo-800 text-base font-normal leading-normal">
                        Xử lý nước
                      </div>
                    </div>
                    <h3 className="text-[20px] text-[#374151] font-[500]">
                      Quản lý hoạt động tái sử dụng nước thải doanh...
                    </h3>
                    <p className="text-[18px] text-[#8899A8]">
                      A Viewpoint by Davide S., Delivery Director, Aina P.,
                      Consultant, and...
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
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
