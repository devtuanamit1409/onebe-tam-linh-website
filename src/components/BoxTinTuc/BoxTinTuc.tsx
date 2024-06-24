import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
interface BoxTinTucProps {
  data: Array<any>;
}

const BoxTinTuc: React.FC<BoxTinTucProps> = ({ data }) => {
  // console.log("dataBaiVIet", data);/

  const baseUrl = process.env.URL_API;
  const t = useTranslations("detail_post");
  return (
    <>
      <div className="grid grid-cols-12 gap-8 overflow-hidden">
        {data && data.length > 0 ? (
          data.map((item) => {
            if (!item.seo) return null;
            return (
              <Link
                href={item.slug}
                key={item.id}
                className="col-span-12 desktop:col-span-4 mb-[40px]">
                <div className="relative">
                  <div className="h-[300px] relative overflow-hidden">
                    <div className="abosolute top-0 left-0 ">
                      <Image
                        objectFit="containt"
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
                      {t("lastest_news")}
                    </span>
                  </div>
                </div>
                <div className="pt-[24px] pb-[16px]">
                  <h5 className="text-[#000] font-bold text-[24px] leading-[38.4px]">
                    {item.title}
                  </h5>
                </div>
                <p className="text-[#637381] font-[400] leading-[24px]">
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
