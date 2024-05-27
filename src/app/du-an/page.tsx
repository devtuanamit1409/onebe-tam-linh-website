import IconAngleRightColorFull from "@/components/icons/IconAngleRightColorFull";
import bannerDuAn from "../../../public/images/banner/banner-du-an.png";
import Image from "next/image";
import Link from "next/link";

import PageMenu from "@/components/PageMenu";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconChemicalBottle from "@/components/icons/IconChemiscalBottle";
import IconCircleLeaf from "@/components/icons/IconCircleLeaf";
import IconCircleDesign from "@/components/icons/IconCircleDesign";

const page = () => {
  const menuItem = [
    {
      title: "Ngành Xử lý Nước",
      url: "/",
      tagIcon: <IconChemicalBottle />,
      children: [
        {
          title: "Dự án xử lý nước thải tòa nhà văn phòng FPT 3 – quận 9, HCM",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có",
          children: [],
        },
        {
          title: "Dự án xử lý nước thải y tế Bệnh viện Quận 7, Hồ Chí Minh",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
    },
    {
      title: "Ngành Thiết kế cơ điện",
      url: "/",
      tagIcon: <IconCircleDesign />,
      children: [
        {
          title:
            "Dự án Tư vấn thiết kế cơ điện công trình Nhà máy Nhựa Tiền Phong",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "10 bước lắp đặt Thiết Bị Tưới HCM ai cũng có thể thực hiện",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
    },
    {
      title: "Dự án cộng đồng",
      url: "/",
      tagIcon: <IconCircleLeaf />,

      children: [
        {
          title: "ATM Nước",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Tư vấn quản lý và sử dụng nguồn nước hiệu quả",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Chuyện của nước",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
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
  return (
    <div>
      <div className="relative w-full h-[18.5%] min-h-[682px] overflow-hidden">
        <Image
          src={bannerDuAn}
          alt="banner"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="container">
        <div className=" flex-col justify-start items-center gap-6 flex mt-[40px]">
          <h2 className="text-black text-[54px] font-bold  capitalize leading-normal">
            Dự án
          </h2>
          <p className="text-gray-500 text-xl font-medium  leading-normal">
            This is a short discription about this content
          </p>
        </div>
        <PageMenu menu={menuItem} />
      </div>
      <div className="bg-[#F3F6FE] py-[80px]">
        <div className="container">
          <div className="inline-flex justify-between items-center w-full py-2 pb-[40px]">
            <h2 className="text-black text-[32px] font-bold capitalize leading-[51.20px]">
              Tin Tức
            </h2>
            <Link
              href={"/"}
              className="text-center text-indigo-800 text-base font-medium leading-normal inline-flex gap-2.5">
              Tới trang tin tức <IconArrowRight width={20} height={20} />
            </Link>
          </div>
          <BoxTinTuc data={data_tin_tuc.slice(0, 3)} />
        </div>
      </div>
      <div className="container">
        <ContactEnd />
      </div>
    </div>
  );
};
export default page;
