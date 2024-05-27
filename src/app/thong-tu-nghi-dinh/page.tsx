import Image from "next/image";
import demo_thong_tu_nghi_quyet from "../../../public/images/thong-tu-nghi-quyet/demo-thong-tu-nghi-quyet.png";
import IconArrowRight from "@/components/icons/IconArrowRight";
import Link from "next/link";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconAngleRightColorFull from "@/components/icons/IconAngleRightColorFull";
import PageMenu from "@/components/PageMenu";

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
  const menuItem = [
    {
      title: "xử lý nước Cấp",
      url: "/",
      children: [
        {
          title: "Hệ thống lọc tổng",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có",
          children: [],
        },
        {
          title: "Xử lý nước cấp sinh hoạt",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
    },
    {
      title: "Tái sử dụng nước",
      url: "/",
      children: [
        {
          title: "Thu gom và sử dụng nước mưa",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Tái sử dụng nước thải",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
    },
    {
      title: "xử lý nước Thải",
      url: "/",
      children: [
        {
          title: "Xử lý nước thải bệnh viện",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Xử lý nước thải khu dân cư",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Xử lý nước thải toà nhà văn phòng",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Xử lý nước thải trường học",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
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
            Thông tư - Nghị Định
          </h2>
          <p className="text-gray-500 text-xl font-medium  leading-normal">
            This is a short discription about this content
          </p>
        </div>
        <PageMenu menu={menuItem} />
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
