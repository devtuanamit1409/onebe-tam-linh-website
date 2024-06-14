import React from "react";
import Image from "next/image";

interface BoxTinTucProps {
  data: Array<any>;
}

const BoxTinTuc: React.FC<BoxTinTucProps> = ({ data }) => {
  const baseUrl = process.env.URL_API;

  return (
    <>
      <div className="grid grid-cols-12 gap-8 overflow-hidden">
        {data.map((item) => {
          if (!item.seo) return null;
          return (
            <div
              key={item.id}
              className="col-span-12 desktop:col-span-4 mb-[40px]"
            >
              <div className="relative">
                <div className="h-[300px] relative overflow-hidden">
                  <div className="abosolute top-0 left-0 ">
                    <Image
                      objectFit="cover"
                      alt="tin-tuc"
                      src={`${baseUrl}${item.seo.thumbnail.data.attributes.url}`}
                      layout="fill"
                      // width={10}
                      // height={10}
                    />
                  </div>
                </div>
                <div className="absolute top-[10%] left-[5%]">
                  <span className="text-[18px] p-[10px] time-up font-bold">
                    {item.danh_muc_bai_viets?.data[0]?.attributes?.name ||
                      "Mới đây"}
                  </span>
                </div>
              </div>
              <div className="pt-[24px] pb-[16px]">
                <h5 className="text-[#000] font-bold text-[24px] leading-[38.4px]">
                  {item.title}
                </h5>
              </div>
              <p className="text-[#637381] font-[400] leading-[24px]">
                {item.seo.description}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BoxTinTuc;
