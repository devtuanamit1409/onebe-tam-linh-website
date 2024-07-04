import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
interface BoxTinTucProps {
  data: Array<any>;
}

const BoxTinTuc: React.FC<BoxTinTucProps> = ({ data }) => {
  const baseUrl = process.env.URL_API;
  const t = useTranslations("detail_post");

  const formatTimeBadge = (createdAt: string) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
      locale: vi,
    });
    return timeAgo;
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-8 overflow-hidden">
        {data && data.length > 0 ? (
          data.map((item) => {
            if (!item.seo) return null;
            return (
              <Link
                href={item.slug || "/"}
                key={item.id}
                className="col-span-12 tablet:col-span-6 laptop:col-span-6 desktop:col-span-4 mb-[40px] max-w-[460px] mx-auto">
                <div className="relative">
                  <div className=" max-h-[280px] laptop:h-[280px] tablet:h-[220px] relative overflow-hidden bg-slate-200">
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
                        ? formatTimeBadge(item.createdAt)
                        : t("lastest_news_tag")}
                    </span>
                  </div>
                </div>
                <div className="mt-[24px] mb-[16px]">
                  <h5
                    title={item.title}
                    className="text-[#000] font-[600] laptop:text-[24px] laptop:leading-[38.4px] mobile:text-[18px] mobile:leading-[28.8px] line-clamp-2 mobile:min-h-none laptop:min-h-[77px]">
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
