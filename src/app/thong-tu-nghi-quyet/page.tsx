import Image from "next/image";
import demo_thong_tu_nghi_quyet from "../../../public/images/thong-tu-nghi-quyet/demo-thong-tu-nghi-quyet.png";
import IconArrowRight from "@/components/icons/IconArrowRight";
import Link from "next/link";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
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
  ];
  return (
    <>
      <div className="relative w-full h-[18.5%] min-h-[682px]">
        <Image
          src={demo_thong_tu_nghi_quyet}
          alt="banner"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="container">
        <div className=" flex-col justify-center items-center gap-6 flex mt-[40px]">
          <h2 className="text-black text-[54px] font-bold  capitalize leading-0">
            Thông tư, nghị quyết
          </h2>
          <p className="text-gray-500 text-xl font-medium  leading-normal">
            This is a short discription about this content
          </p>
        </div>
      </div>
      <div className="bg-[#F3F6FE] py-[80px]">
        <div className="container">
          <div className="flex justify-between  pb-[40px]">
            <h2 className="font-bold text-[32px]">Tin tức</h2>
            <Link href="/tin-tuc" className="flex items-center">
              <p className="font-medium mr-[8px] text-[#3B559E]">
                Tới trang tin tức
              </p>
              <IconArrowRight width={20} height={20} />
            </Link>
          </div>
          <BoxTinTuc data={data_tin_tuc} />
        </div>
      </div>
      <div className="container">
        <ContactEnd />
      </div>
    </>
  );
};

export default page;
