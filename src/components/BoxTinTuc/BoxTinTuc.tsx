import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
interface BoxTinTucProps {
  data: Array<any>;
}

const BoxTinTuc: React.FC<BoxTinTucProps> = ({ data }) => {
  console.log("dataBaiVIet", data);

  const baseUrl = process.env.URL_API;
  const t = useTranslations("detail_post");

  const checkIfCreatedWithin24Hours = (createdAtStr: string): boolean => {
    const createdAt = new Date(createdAtStr);
    const now = new Date();
    const timeDifference = now.getTime() - createdAt.getTime();
    return timeDifference <= 24 * 60 * 60 * 1000; // 24 giờ tính bằng milliseconds
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-8 overflow-hidden">
        {data && data.length > 0 ? (
          data.map((item) => {
            // console.log("item", item);
            if (!item.seo) return null;
            return (
              <Link
                href={item.slug || "/"}
                key={item.id}
                className="col-span-12 desktop:col-span-4 mb-[40px] max-w-[460px] mx-auto">
                <div className="relative">
                  <div className=" max-h-[280px] h-[280px] relative overflow-hidden bg-slate-200">
                    <div className="abosolute top-0 left-0  w-full h-full flex items-center justify-center">
                      <Image
                        objectFit="contain"
                        alt="tin-tuc"
                        src={`${baseUrl}${item.seo?.thumbnail?.data?.attributes?.url}`}
                        layout="responsive"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="absolute top-[10%] left-[5%]">
                    <span className="text-[18px] p-[10px] time-up font-[400]">
                      {item.createdAt
                        ? checkIfCreatedWithin24Hours(item.createdAt)
                          ? t("lastest_news_tag")
                          : formatDate(item.createdAt)
                        : t("lastest_news_tag")}
                    </span>
                  </div>
                </div>
                <div className="pt-[24px] pb-[16px]">
                  <h5
                    title={item.title}
                    className="text-[#000] font-bold text-[24px] leading-[38.4px] line-clamp-2 laptop:min-h-[77px]">
                    {item.title}
                  </h5>
                </div>
                <p
                  title={item.seo?.description}
                  className="text-[#637381] font-[400] leading-[24px] line-clamp-3">
                  {item.seo?.description}
                </p>
              </Link>
            );
          })
        ) : (
          <div className="col-span-12">
            <h3 className="text-center text-black text-[32px] font-bold">
              {t("nodata_news")}
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default BoxTinTuc;
