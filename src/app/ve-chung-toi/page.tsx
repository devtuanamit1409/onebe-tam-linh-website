import React from "react";
import Image from "next/image";
import "../../styles/pages/ve-chung-toi.css";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import imageOne from "../../../public/images/ve-chung-toi/01.png";
import imageTwo from "../../../public/images/ve-chung-toi/02.png";
import imageThree from "../../../public/images/ve-chung-toi/03.png";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";

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
      <div className="flex justify-center ">
        <div className="container">
          <div className="flex justify-center py-[67px]">
            <Image
              src="/images/ve-chung-toi/logo-ve-toi.png"
              alt="Về NTS"
              width={653}
              height={97}
            />
          </div>
          <div className="flex justify-center pt-[40px] overflow-hidden">
            <div className="max-w-[1000px]">
              <p className="text-[20px] font-medium">
                Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định hướng trở
                thành nhà cung cấp hàng đầu cho các giải pháp kỹ thuật công
                trình. Tất cả đều hướng đến trọng tâm là phục vụ tiện ích cho
                cuộc sống một cách bền vững và lâu dài. Theo đó những lĩnh vực
                chính mà NTS theo đuổi một cách tâm huyết ngay từ những ngày đầu
                là: Tư vấn cơ điện, Xử lý nước, Tái sử dụng nước; Cung cấp thiết
                bị sân vườn, thiết bị tưới cây; Thiết bị thu hồi nước mưa và các
                tiện ích khác…
              </p>
              <div className="pt-[40px] rounded-[32px] overflow-hidden relative">
                <Image
                  src="/images/ve-chung-toi/banner-ve-chung-toi.jpg"
                  layout="responsive"
                  width={1920}
                  height={1080}
                  alt="Về chúng tôi"
                  className="rounded-[32px]"
                />
              </div>
            </div>
          </div>
          <div className="py-[80px]">
            <div className="grid grid-cols-12 laptop:gap-x-[80px] mobile:gap-y-[48px]">
              <div className="laptop:col-span-4 mobile:col-span-12">
                <div className="box-vct-1 border-2 border-solid border-[#3B559E]   desktop:w-[351px] laptop:h-[535px] laptop:w-[315px] p-[24px] mobile:pb-[130px] relative">
                  <Image
                    src={imageOne.src}
                    alt="01"
                    className="absolute bottom-0 right-4"
                    width={139}
                    height={91}
                  />
                  <h5 className="text-[#3B559E] font-bold text-[30px]">
                    Nền tảng con người
                  </h5>
                  <p className="text-[#1F2A37] text-[18px] mt-[14px]">
                    Nhân sự chủ chốt và cán bộ kỹ thuật tốt nghiệp các trường
                    Đại học, Cao đẳng chuyên ngành hàng đầu Việt Nam, cùng với
                    sự cố vấn đồng hành của các chuyên gia hàng đầu ngành kỹ
                    thuật nước và môi trường từng học tập, nghiên cứu và công
                    tác tại Đại học Bách Khoa TP.HCM, Đại học Khoa học Tự nhiên,
                    Cao đẳng Xây dựng TP.HCM.
                  </p>
                </div>
              </div>
              <div className="laptop:col-span-4 mobile:col-span-12">
                <div className="box-vct-2 border-2 border-solid border-[#3B559E]  desktop:w-[351px] laptop:h-[535px] laptop:w-[315px]  p-[24px] mobile:pb-[130px] relative">
                  <Image
                    src={imageTwo.src}
                    alt="02"
                    className="absolute bottom-0 right-4"
                    width={139}
                    height={91}
                  />

                  <h5 className="text-[#3B559E] font-bold text-[30px]">
                    Nhu cầu thị trường
                  </h5>
                  <p className="text-[#1F2A37] text-[18px] mt-[14px]">
                    Năm 2004- 2012 là giai đoạn ngành xây dựng phát triển mạnh
                    mẽ. Tuy nhiên thị trường chỉ ưu tiên phát triển số lượng
                    công trình mà chưa tập trung vào chất lượng tiện ích đi kèm.
                    Các kỹ thuật cơ bản như thiết kế cơ điện; điện nước, điều
                    hòa không khí, PCCC, hệ thống điều khiển tòa nhà thông minh
                    (iBMS)… chưa được chú trọng và do đó bị bỏ xa so với xu
                    hướng của thế giới.
                  </p>
                </div>
              </div>
              <div className="laptop:col-span-4 mobile:col-span-12">
                <div className="box-vct-3 border-2 border-solid border-[#3B559E]  desktop:w-[351px] laptop:h-[535px] laptop:w-[315px]  p-[24px] mobile:pb-[130px] relative">
                  <Image
                    src={imageThree.src}
                    alt="03"
                    className="absolute bottom-0 right-4"
                    width={139}
                    height={91}
                  />

                  <h5 className="text-[#3B559E] font-bold text-[30px]">
                    Ý chí và đam mê của người sáng lập cùng các đối tác
                  </h5>
                  <p className="text-[#1F2A37] text-[18px] mt-[14px]">
                    Dựa trên nền tảng chuyên môn kỹ thuật được đào tạo, qua quá
                    trình làm nghề cộng với sự hỗ trợ, chắt lọc từ thế hệ chuyên
                    gia đi trước, NTS khao khát mang tới cuộc sống tốt hơn cho
                    cộng đồng.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-[1000px] pb-[40px]">
              <div className="grid grid-cols-12 gap-4 tablet:gap-8 mobile:gap-4">
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[210px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    Các tổng thầu
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    <li className="text-[20px] font-medium">
                      Công ty TNHH Xây dựng Lưu Nguyễn
                    </li>
                    <li className="text-[20px] font-medium">
                      Công ty Cổ phần xây dựng Kỹ Thuật Việt Viteccons
                    </li>
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[210px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    Các đối tác nước ngoài
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    <li className="text-[20px] font-medium">
                      Claber Spa Italy
                    </li>
                    <li className="text-[20px] font-medium">Ecopa Spa Italy</li>
                    <li className="text-[20px] font-medium">
                      Solveit Vina Korea
                    </li>
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[210px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    Các chủ đầu tư nước ngoài:
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    <li className="text-[20px] font-medium">
                      Hệ thống phòng khám Gia Đình (Family Medical Practice –
                      Israel) Care1, Diamond, Thao Dien FMP.
                    </li>
                    <li className="text-[20px] font-medium">
                      Hệ thống 30 rạp chiếu phim Lotte Cinema (Hàn Quốc) trên
                      toàn quốc.
                    </li>
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[210px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    Các công ty và tập đoàn
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    <li className="text-[20px] font-medium">
                      Công ty TNHH Phần mềm FPT TPHCM;
                    </li>
                    <li className="text-[20px] font-medium">
                      Công ty TNHH Đầu tư Khu đô thị Việt Hưng Ecopark
                      (VIHAJICO)
                    </li>
                    <li className="text-[20px] font-medium">
                      Công ty Cổ phần An Phú
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-[20px] font-medium laptop:mt-[40px] tablet:mt-[32px] mobile:mt-4">
                Đội ngũ NTS luôn tận lực để mang lại sự hài lòng, niềm tin hay
                xa hơn là mang tới hạnh phúc cho khách hàng bằng những giá trị
                thật sự từ trí tuệ. Chúng tôi mong muốn được mở rộng gặp gỡ và
                hợp tác với các khách hàng, bạn hàng hiểu được những giá trị mà
                chúng tôi xây dựng. Hãy cùng tạo ra một môi trường kinh doanh
                lành mạnh và đóng góp chung vào sự phát triển của đất nước.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <BoxTinTuc data={data_tin_tuc.slice(0, 3)} />
        <ContactEnd />
      </div>
    </>
  );
};

export default page;
