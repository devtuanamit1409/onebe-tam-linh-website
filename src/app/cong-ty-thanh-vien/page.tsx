import Image from "next/image";
import cong_ty_thanh_vien from "../../../public/images/ve-chung-toi/cong-ty-thanh-vien.png";
import "../../styles/pages/home.css";
import IconAngleRight from "@/components/icons/IconAngleRight";

const page = () => {
  const member = [
    {
      name: "Irritec",
      describe:
        "This is a short description about this card.This is a short description about this card.",
      urlLogo: "/images/ve-chung-toi/doi-tac-1.png",
      width: 194,
      height: 44,
    },
    {
      name: "Tata Garden",
      describe:
        "This is a short description about this card.This is a short description about this card.",
      urlLogo: "/images/ve-chung-toi/doi-tac-2.png",
      width: 103,
      height: 103,
    },
    {
      name: "Irricons",
      describe:
        "This is a short description about this card.This is a short description about this card.",
      urlLogo: "/images/ve-chung-toi/doi-tac-3.png",
      width: 190,
      height: 45,
    },
    {
      name: "Irritec",
      describe:
        "This is a short description about this card.This is a short description about this card.",
      urlLogo: "/images/ve-chung-toi/doi-tac-1.png",
      width: 194,
      height: 44,
    },
    {
      name: "Tata Garden",
      describe:
        "This is a short description about this card.This is a short description about this card.",
      urlLogo: "/images/ve-chung-toi/doi-tac-2.png",
      width: 103,
      height: 103,
    },
    {
      name: "Irricons",
      describe:
        "This is a short description about this card.This is a short description about this card.",
      urlLogo: "/images/ve-chung-toi/doi-tac-3.png",
      width: 190,
      height: 45,
    },
  ];
  return (
    <>
      <div className="relative w-full h-[18.5%] desktop:min-h-[682px] laptop:min-h-[455px] tablet:min-h-[400px] mobile:min-h-[200px] overflow-hidden">
        <Image
          src={cong_ty_thanh_vien}
          alt="banner"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="desktop:pt-[80px] pt-[32px] pb-[64px]">
        <div className="flex flex-col gap-[24px] desktop:gap-[40px] text-center">
          <h5 className="text-[#28A645] text-[16px] desktop:text-[20px] font-medium">
            CÁC CÔNG TY THÀNH VIÊN
          </h5>
          <h1 className="text-[24px] desktop:text-[54px] font-bold">
            Đồng hành cùng chúng tôi
          </h1>
          <p>This is a short discription about this content</p>
        </div>
      </div>
      <div className="pb-[80px]">
        <div className="container">
          <div className="grid grid-cols-12 desktop:gap-[50px] tablet:gap-[32px]">
            {member.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-span-12 tablet:col-span-6 desktop:col-span-4 pb-[32px] desktop:pb-[0px] ">
                  <div className="border border-[#DFE4EA]">
                    <div className="px-[24px] pb-[24px] pt-[100px]">
                      <div className="flex flex-col gap-[24px]">
                        <div className="flex justify-center">
                          <div className="max-w-[190x] max-h-[103px]">
                            <div className="">
                              <Image
                                src={item.urlLogo}
                                alt="logo"
                                width={100}
                                height={103}
                                layout="responsive"
                              />
                            </div>
                          </div>
                        </div>
                        <h2 className="text-center font-semibold text-[28px]">
                          {item.name}
                        </h2>
                        <p className="text-[#6B7280] text-[18px]">
                          This is a short description about this card.This is a
                          short description about this card.{" "}
                        </p>
                        <div className="py-[24px] flex justify-center">
                          <button className="py-[16px] flex  items-center text-[16px] text-[#28A645] px-[24px] bg-[#FFFFFF] btn-truy-cap-web">
                            <span className="mr-[8px]">Truy cập website</span>
                            <IconAngleRight width="16" height="16" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center pt-[40px]">
            <button className="py-[12px] px-[24px] bg-[#28A645] text-[white] rounded-[50px] border border-[#28A645] hover:bg-[#fff] hover:text-[#28A645] ">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
