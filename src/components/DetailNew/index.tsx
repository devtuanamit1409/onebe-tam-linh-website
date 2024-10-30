"use client";
import React, { useEffect, useState } from "react";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEndClient from "@/components/ContactEndClient/ContactEndClient";
import IconArrowRight from "@/components/icons/IconArrowRight";
import DetailCategory from "@/components/DetailCategory";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import zaloIcon from "public/images/logo/zalo-rounded.png";
import Image from "next/image";
import { useRouter } from "next/router";

interface DetailNewProps {
  detailBaiViet: {
    title: string;
    content: string;
  } | null;
  detailCategory: any;
  locale: string;
  breadcum: string;
  subBreadcum: string;
  slugSubBreadcum: string;
  recomenData: Array<{
    id: number;
    title: string;
    slug: string;
    locale: string;
    subTitle?: string;
    seo: any;
    createdAt: string;
  }>;
}

const DetailNew: React.FC<DetailNewProps> = ({
  detailBaiViet,
  detailCategory,
  locale,
  breadcum,
  subBreadcum,
  slugSubBreadcum,
  recomenData,
}) => {
  const t = useTranslations("detail_post");
  const translate = useTranslations("404");

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Đảm bảo mã này chỉ chạy trên client
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <>
      {detailBaiViet ? (
        <>
          {/* Breadcrumb */}
          <div className="bg-gray-50">
            <div className="container mx-auto py-4 text-gray-500 text-base font-medium leading-normal">
              <Link href={"/"}>{locale === "en" ? "Home" : "Trang chủ"}</Link>
              <span className="mx-2"> / </span>
              <Link
                href={`${
                  breadcum === "Sản phẩm"
                    ? "/san-pham"
                    : breadcum === "Dịch vụ"
                    ? "/dich-vu"
                    : breadcum === "Góc chuyên gia"
                    ? "/goc-chuyen-gia"
                    : breadcum === "Dự án"
                    ? "/du-an"
                    : breadcum === "Thông tư nghị định"
                    ? "/thong-tu-nghi-dinh"
                    : ""
                }`}>
                {breadcum}
              </Link>
              {breadcum && <span className="mx-2"> / </span>}
              <Link href={slugSubBreadcum ? `/${slugSubBreadcum}` : "/"}>
                {subBreadcum}
              </Link>
              {subBreadcum && <span className="mx-2"> / </span>}
              <span className="text-[#000]">{detailBaiViet.title}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="laptop:px-[156px] tablet:px-[128px] mobile:px-[16px] text-gray-800 laptop:text-[54px] tablet:text-[40px] mobile:text-[32px] font-bold leading-normal text-center laptop:mb-[24px] mobile:mb-[16px]">
            {detailBaiViet.title}
          </h1>

          {/* Category Details */}
          {detailCategory?.category_details?.length > 0 && (
            <DetailCategory categories={detailCategory.category_details} />
          )}

          {/* Content */}
          <div
            className="blog-content py-[40px] laptop:px-[156px] tablet:px-[128px] mobile:px-[16px] mobile:pb-[20px]"
            dangerouslySetInnerHTML={{ __html: detailBaiViet.content || "" }}
          />

          {/* Social Share Buttons */}
          <div className="flex space-x-4 my-4 laptop:px-[156px] tablet:px-[128px] mobile:px-[16px] mobile:pb-[20px]">
            <p className="text-black text-base font-medium leading-normal">
              Chia sẻ ngay:
            </p>
            <FacebookShareButton url={currentUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton url={currentUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <a
              href={`https://zalo.me/share/?url=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer">
              <Image src={zaloIcon} alt="Chia sẻ zalo" width={32} height={32} />
            </a>
          </div>

          {/* Contact Component */}
          <div className="container">
            <ContactEndClient />
          </div>

          {/* Related Posts */}
          <div className="bg-[#F3F6FE] py-[80px]">
            <div className="container">
              <div className="inline-flex justify-between items-center w-full py-2 pb-[40px]">
                <p className="text-black laptop:text-[32px] mobile:text-[18px] font-bold capitalize ">
                  {t("title_post")}
                </p>
                <Link
                  href={`/${locale}/tin-tuc`}
                  className="text-center text-[#3B559E] text-base font-medium leading-normal inline-flex items-center gap-2.5">
                  {t("go_to_news_page")}
                  <IconArrowRight width={20} height={20} />
                </Link>
              </div>
              <BoxTinTuc data={recomenData.slice(0, 3)} locale={locale} />
            </div>
          </div>
        </>
      ) : (
        // 404 Content
        <div className="flex h-[500px] bg-[#3B559E] mb-[80px]">
          <div className="w-full h-full flex flex-col justify-center items-center gap-[35px]">
            <p className="text-center text-[#fff] text-[48px] font-bold ">
              {translate("404")}
            </p>
            <p className="text-center text-[#fff] text-[23px] font-bold ">
              {translate("not_found")}
            </p>
            <p className="text-center text-[#fff] text-[23px] font-bold ">
              {translate("maybe_delete")}
            </p>
            <Link
              href="/"
              className="min-w-[187px] h-12 px-6 py-3 rounded-md border border-white justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal">
              {translate("back_home")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailNew;
