"use client";

import logoFullWidth from "../../../public/images/logo/logo-fullwidth.png";
import LogoBoCongThuong from "../../../public/images/logo/logoBoCongThuong.png";
import IconPhone from "../icons/IconPhone";
import IconLocation from "../icons/IconLocation";
import Map from "../Map";
import Image from "next/image";
import Link from "next/link";
import IconFacebookRounded from "../icons/IconFacebookRounded";
import IconYoutubeRounded from "../icons/IconYoutubeRounded";

const Footer = () => {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9277600307532!2d106.77582227570356!3d10.816840358445626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317526f09a002519%3A0x5490599bcffafcdb!2zMTUgxJAuIFPhu5EgMywgS2h1IGTDom4gY8awIEdpYSBIb8OgLCBRdeG6rW4gOSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1716304643844!5m2!1sen!2s";

  return (
    <>
      <footer>
        <div className="grid grid-cols-1 laptop:grid-cols-12 px-[16px] desktop:px-[135px] desktop:pt-[75px] pt-[40px] pb-4 bg-[#3B559E] gap-4">
          <div className="mobile:col-span-12 laptop:col-span-3">
            <div className=" mobile:col-span-12  laptop:col-span-3">
              <div className="flex-col justify-start items-start gap-4 flex w-full">
                <div className="px-2 pb-4 rounded-lg flex-col justify-start items-start gap-4 flex">
                  <Image
                    src={logoFullWidth.src}
                    alt="logo NTS"
                    width={304}
                    height={40}
                  />
                </div>
                <div className="justify-start items-center gap-2.5 desktop:inline-flex mobile:flex">
                  <div className=" justify-center items-center desktop:inline-flex mobile:flex">
                    <div className="">
                      <a href="tel:+01234567899" target="_blank">
                        <IconPhone />
                      </a>
                    </div>
                  </div>
                  <a
                    href="tel:+01234567899"
                    target="_blank"
                    className="text-white text-sm font-medium  leading-snug">
                    +012 (345) 678 99
                  </a>
                </div>
                <div className="justify-start items-center gap-2.5 desktop:inline-flex mobile:flex">
                  <div className=" justify-center items-center flex">
                    <div className=" relative">
                      <a
                        href="https://maps.app.goo.gl/5Xvr5GSDVnPz393Y9"
                        target="_blank">
                        <IconLocation />
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/5Xvr5GSDVnPz393Y9"
                    target="_blank"
                    className=" text-white text-sm font-medium  leading-snug desktop:max-w-[300px] laptop:w-full">
                    Số 15, đường số 3, KDC Gia Hòa, P. Phước Long B, Tp.Thủ Đức,
                    Tp.HCM
                  </a>
                </div>
                <div className="w-full desktop:max-w-[312px] desktop:max-h-[312px] mobile:w-full mobile:h-full">
                  <Map
                    src={mapSrc}
                    className="mobile:aspect-1.55 desktop:aspect-[6/5]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mobile:col-span-12 laptop:col-start-4 laptop:col-end-13 desktop:pl-[40px] laptop:pl-[24px] desktop:flex justify-between mobile:grid mobile:grid-cols-2 gap-4">
            <div className="mobile:col-span-1 flex-1 ">
              <div className="flex-col">
                <p className="text-white text-lg font-semibold  leading-relaxed pr-2">
                  Sản phẩm
                </p>
                <div className=" h-24 flex-col justify-start items-start gap-3 inline-flex">
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Vật liệu mới, thiết bị plastic ngành nước
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Thiết bị xử lý nước
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Thiết bị tưới cây, tưới cây tự động
                  </Link>
                </div>
              </div>
            </div>
            <div className="mobile:col-span-1 flex-1 ">
              <div className="flex-col">
                <p className="text-white text-lg font-semibold  leading-relaxed pr-2">
                  Dịch vụ
                </p>
                <div className="flex-col justify-start items-start gap-3 flex">
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Tư vấn kỹ thuật nước
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Tư vấn giải pháp tái sử dụng nước
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Thi công, chuyển giao công nghệ
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Bảo hành, bảo trì chuyên nghiệp
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Đào tạo nghề ngành nước
                  </Link>
                </div>
              </div>
            </div>
            <div className="mobile:col-span-1 flex-1 ">
              <div className="flex-col">
                <p className="text-white text-lg font-semibold  leading-relaxed pr-2">
                  Công ty Kỹ thuật NTS
                </p>
                <div className="flex-col justify-start items-start gap-3 flex">
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Về chúng tôi
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Công ty thành viên
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Góc chuyên gia
                  </Link>
                  <Link
                    href="/"
                    className="text-white text-base font-normal  leading-normal">
                    Chương trình cộng đồng
                  </Link>
                </div>
              </div>
            </div>
            <div className="mobile:col-span-1 flex-1 ">
              <div className="flex-col">
                <p className="text-white text-lg font-semibold  leading-relaxed pr-2">
                  Theo dõi chúng tôi trên
                </p>
                <div className="flex-col justify-start items-start gap-[25px] flex">
                  <div className="justify-start items-start gap-[15px] inline-flex">
                    <div className=" relative">
                      <IconFacebookRounded />
                    </div>
                    <div className=" relative">
                      <IconYoutubeRounded />
                    </div>
                  </div>
                  <Image
                    src={LogoBoCongThuong.src}
                    alt="logo Bộ Công Thương"
                    width={186}
                    height={70}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile:hidden tablet:block w-full px-2 py-4 border-t bg-[#3B559E] border-white justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-white text-base font-normal  leading-normal ">
            <p>
              Giấy chứng nhận đăng ký doanh nghiệp số 0312218474, đăng ký lần
              đầu ngày 03/04/2013, tại Sở KH&ĐT TP.HCM.
            </p>
            <p> Copyright 2024 © NTSE.VN</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
