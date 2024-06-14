import React from "react";
import Image from "next/image";
import "../../../styles/pages/ve-chung-toi.css";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import imageOne from "../../../../public/images/ve-chung-toi/01.png";
import imageTwo from "../../../../public/images/ve-chung-toi/02.png";
import imageThree from "../../../../public/images/ve-chung-toi/03.png";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import { Metadata } from "next";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";

const searchData = {
  populate: [
    "seo.thumbnail",
    "videoAbout",
    "boxAbout",
    "cacTongThau",
    "cacDoiTacNuocNgoai",
    "cacChuDauTuNuocNgoai",
    "cacCongTyVaTapDoan",
  ].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(params: any): Promise<Metadata> {
  const dataVeChungToi = await fetchData(
    `${ENDPOINT.GET_VECHUNGTOI}?${searchParams}}&locale=${params.params.locale}`
  );
  const seo =
    (dataVeChungToi as { data: { attributes: { seo: any } } })?.data?.attributes
      ?.seo || {};
  console.log(
    `${ENDPOINT.GET_VECHUNGTOI}?${searchParams}}&locale=${params.params.locale}`
  );

  const baseUrl = process.env.URL_API;

  return {
    metadataBase: new URL(baseUrl || ""),
    title: seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
    description:
      seo.description ||
      "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
    keywords:
      seo.keywords ||
      "kỹ thuật, công trình, tư vấn cơ điện, xử lý nước, tái sử dụng nước",
    authors: [{ name: seo.author || "Công ty TNHH Kỹ thuật NTS" }],
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.ogDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      url: `${baseUrl}/home`,
      images: [
        {
          url: seo.thumbnail?.data?.attributes?.url
            ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
            : "/path/to/default-image.jpg",
          width: 800,
          height: 600,
          alt: "Image description",
        },
      ],
    },
    twitter: {
      title:
        seo.twitterTitle ||
        seo.title ||
        "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.twitterDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      images: [
        seo.twitterImage
          ? `${baseUrl}${seo.twitterImage}`
          : "/path/to/default-image.jpg",
      ],
      card: "summary_large_image",
    },
  };
}
async function fetchData(endpoint: string) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
const page = async (params: any) => {
  let locale = params.params.locale;
  const dataVeChungToi = await fetchData(
    `${ENDPOINT.GET_VECHUNGTOI}?${searchParams}&locale=${locale}`
  );

  const dataTinTuc = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?${searchParams}&locale=${locale}`
  );

  const baiViet = dataTinTuc as {
    data: {
      attributes: {
        id: number;
        title: string;
        slug: string;
        type: string;
        bai_viet_tieu_diem: boolean;
        danh_muc_bai_viets: {
          data: {
            attributes: {
              name: string;
            };
          }[];
        };
        seo: {
          description: string;
          thumbnail: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    }[];
  };

  const tintuc = baiViet?.data
    .filter((item) => item?.attributes?.type === "Tin tức")
    .map((item) => item.attributes);

  const baseUrl = process.env.URL_API;
  const contentFirst = (
    dataVeChungToi as { data: { attributes: { contentFirst: string } } }
  )?.data?.attributes?.contentFirst;
  const contentEnd = (
    dataVeChungToi as { data: { attributes: { contentEnd: string } } }
  )?.data?.attributes?.contentEnd;
  const boxAbout = (
    dataVeChungToi as {
      data: {
        attributes: {
          boxAbout: { id: number; title: string; description: string }[];
        };
      };
    }
  )?.data?.attributes?.boxAbout;

  const videoAbout = (
    dataVeChungToi as {
      data: {
        attributes: {
          videoAbout: {
            data: {
              attributes: {
                width: number;
                height: number;
                url: string;
                ext: string;
              };
            };
          };
        };
      };
    }
  )?.data?.attributes?.videoAbout?.data?.attributes;
  const cacTongThau = (
    dataVeChungToi as {
      data: { attributes: { cacTongThau: { id: number; item: string }[] } };
    }
  )?.data?.attributes?.cacTongThau;
  const cacDoiTacNuocNgoai = (
    dataVeChungToi as {
      data: {
        attributes: { cacDoiTacNuocNgoai: { id: number; item: string }[] };
      };
    }
  )?.data?.attributes?.cacDoiTacNuocNgoai;
  const cacChuDauTuNuocNgoai = (
    dataVeChungToi as {
      data: {
        attributes: { cacChuDauTuNuocNgoai: { id: number; item: string }[] };
      };
    }
  )?.data?.attributes?.cacChuDauTuNuocNgoai;
  const cacCongTyVaTapDoan = (
    dataVeChungToi as {
      data: {
        attributes: { cacCongTyVaTapDoan: { id: number; item: string }[] };
      };
    }
  )?.data?.attributes?.cacCongTyVaTapDoan;

  const supportedVideoExtensions = [".mp4", ".mov", ".avi"];
  const supportedImageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

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
                {/* Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định hướng trở
                thành nhà cung cấp hàng đầu cho các giải pháp kỹ thuật công
                trình. Tất cả đều hướng đến trọng tâm là phục vụ tiện ích cho
                cuộc sống một cách bền vững và lâu dài. Theo đó những lĩnh vực
                chính mà NTS theo đuổi một cách tâm huyết ngay từ những ngày đầu
                là: Tư vấn cơ điện, Xử lý nước, Tái sử dụng nước; Cung cấp thiết
                bị sân vườn, thiết bị tưới cây; Thiết bị thu hồi nước mưa và các
                tiện ích khác… */}
                {contentFirst || "description "}
              </p>
              <div className="pt-[40px] overflow-hidden relative">
                {(videoAbout &&
                  supportedVideoExtensions.includes(videoAbout.ext) && (
                    <video controls>
                      <source
                        src={`${baseUrl}${videoAbout.url}`}
                        width={1920}
                        height={1080}
                        type={`video/${videoAbout.ext.slice(1)}`}
                      />
                    </video>
                  )) ||
                  (videoAbout &&
                    supportedImageExtensions.includes(videoAbout.ext) && (
                      <Image
                        src={`${baseUrl}${videoAbout.url}`}
                        layout="responsive"
                        width={1920}
                        height={1080}
                        alt="Về chúng tôi"
                        className="rounded-[32px]"
                      />
                    ))}
                {/* <Image
                  src="/images/ve-chung-toi/banner-ve-chung-toi.jpg"
                  layout="responsive"
                  width={1920}
                  height={1080}
                  alt="Về chúng tôi"
                  className="rounded-[32px]"
                /> */}
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
                    className="absolute bottom-0 right-4 z-0"
                    width={174}
                    height={114}
                  />
                  <h5 className="text-[#3B559E] font-bold text-[30px] relative z-1">
                    {(boxAbout && boxAbout[0]?.title) || "title"}
                  </h5>
                  <p className="text-[#1F2A37] text-[18px] mt-[14px] relative z-1">
                    {/* Nhân sự chủ chốt và cán bộ kỹ thuật tốt nghiệp các trường
                    Đại học, Cao đẳng chuyên ngành hàng đầu Việt Nam, cùng với
                    sự cố vấn đồng hành của các chuyên gia hàng đầu ngành kỹ
                    thuật nước và môi trường từng học tập, nghiên cứu và công
                    tác tại Đại học Bách Khoa TP.HCM, Đại học Khoa học Tự nhiên,
                    Cao đẳng Xây dựng TP.HCM. */}
                    {(boxAbout && boxAbout[0]?.description) || "title"}
                  </p>
                </div>
              </div>
              <div className="laptop:col-span-4 mobile:col-span-12">
                <div className="box-vct-2 border-2 border-solid border-[#3B559E]  desktop:w-[351px] laptop:h-[535px] laptop:w-[315px]  p-[24px] mobile:pb-[130px] relative">
                  <Image
                    src={imageTwo.src}
                    alt="02"
                    className="absolute bottom-0 right-4 z-0"
                    width={186}
                    height={114}
                  />

                  <h5 className="text-[#3B559E] font-bold text-[30px] relative z-1">
                    {/* Nhu cầu thị trường */}
                    {(boxAbout && boxAbout[1]?.title) || "title"}
                  </h5>
                  <p className="text-[#1F2A37] text-[18px] mt-[14px] relative z-1">
                    {/* Năm 2004- 2012 là giai đoạn ngành xây dựng phát triển mạnh
                    mẽ. Tuy nhiên thị trường chỉ ưu tiên phát triển số lượng
                    công trình mà chưa tập trung vào chất lượng tiện ích đi kèm.
                    Các kỹ thuật cơ bản như thiết kế cơ điện; điện nước, điều
                    hòa không khí, PCCC, hệ thống điều khiển tòa nhà thông minh
                    (iBMS)… chưa được chú trọng và do đó bị bỏ xa so với xu
                    hướng của thế giới. */}
                    {(boxAbout && boxAbout[1]?.description) || "title"}
                  </p>
                </div>
              </div>
              <div className="laptop:col-span-4 mobile:col-span-12">
                <div className="box-vct-3 border-2 border-solid border-[#3B559E]  desktop:w-[351px] laptop:h-[535px] laptop:w-[315px]  p-[24px] mobile:pb-[130px] relative">
                  <Image
                    src={imageThree.src}
                    alt="03"
                    className="absolute bottom-0 right-4 z-0"
                    width={186}
                    height={114}
                  />

                  <h5 className="text-[#3B559E] font-bold text-[30px] relative z-1">
                    {(boxAbout && boxAbout[2]?.title) || "title"}
                  </h5>
                  <p className="text-[#1F2A37] text-[18px] mt-[14px] relative z-1">
                    {(boxAbout && boxAbout[2]?.description) || "title"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-[1000px] pb-[40px]">
              <div className="grid grid-cols-12 gap-4 tablet:gap-8 mobile:gap-4">
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[20px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    Các tổng thầu
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    {cacTongThau &&
                      cacTongThau.map((item) => (
                        <li key={item.id} className="text-[20px] font-medium">
                          {item.item}
                        </li>
                      ))}
                    {/* <li className="text-[20px] font-medium">
                      Công ty TNHH Xây dựng Lưu Nguyễn
                    </li>
                    <li className="text-[20px] font-medium">
                      Công ty Cổ phần xây dựng Kỹ Thuật Việt Viteccons
                    </li> */}
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[20px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    Các đối tác nước ngoài
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    {cacDoiTacNuocNgoai &&
                      cacDoiTacNuocNgoai.map((item) => (
                        <li key={item.id} className="text-[20px] font-medium">
                          {item.item}
                        </li>
                      ))}
                    {/* <li className="text-[20px] font-medium">
                      Claber Spa Italy
                    </li>
                    <li className="text-[20px] font-medium">Ecopa Spa Italy</li>
                    <li className="text-[20px] font-medium">
                      Solveit Vina Korea
                    </li> */}
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[20px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    Các chủ đầu tư nước ngoài:
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    {cacChuDauTuNuocNgoai &&
                      cacChuDauTuNuocNgoai.map((item) => (
                        <li key={item.id} className="text-[20px] font-medium">
                          {item.item}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="laptop:col-span-6 mobile:col-span-12 laptop:min-h-[20px]">
                  <h4 className="text-[24px] font-bold text-[#3B559E] pb-[6px]">
                    Các công ty và tập đoàn
                  </h4>
                  <ul className="leading-[32px] list-disc pl-[20px]">
                    {cacCongTyVaTapDoan &&
                      cacCongTyVaTapDoan.map((item) => (
                        <li key={item.id} className="text-[20px] font-medium">
                          {item.item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <p className="text-[20px] font-medium laptop:mt-[40px] tablet:mt-[32px] mobile:mt-4">
                {contentEnd || "description "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* <BoxTinTuc data={tintuc ? tintuc.slice(0, 3) : []} /> */}
        <ContactEnd />
      </div>
    </>
  );
};

export default page;
