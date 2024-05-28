import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import { Pagination } from "antd";
import "../../styles/pages/luat-bao-ve-moi-truong.css";

const page = () => {
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
  return (
    <>
      <div className="desktop:pt-[80px] pt-[32px] pb-[64px]">
        <div className="flex flex-col gap-[24px] desktop:gap-[40px] text-center">
          <h5 className="text-[#28A645] text-[16px] desktop:text-[20px] font-medium">
            THÔNG TƯ - NGHỊ ĐỊNH
          </h5>
          <h1 className="text-[24px] desktop:text-[54px] font-bold">
            Luật bảo vệ môi trường
          </h1>
          <p className="text-[#8899A8]">
            This is a short discription about this content
          </p>
        </div>
      </div>
      <div className="container">
        <BoxTinTuc data={data_tin_tuc} />
      </div>
      <div className="py-[40px] container flex justify-center">
        <Pagination defaultCurrent={1} total={500} showSizeChanger={false} />
      </div>
    </>
  );
};

export default page;
