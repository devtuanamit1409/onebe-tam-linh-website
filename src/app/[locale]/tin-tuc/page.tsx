import React, { Attributes } from "react";
import Image from "next/image";
import "../../../styles/pages/tin-tuc.css";
import TintucNoibat from "@/components/TintucNoibat/TintucNoibat";
import demo_tin_tuc_2 from "../../../../public/images/tin-tuc/demo-tin-tuc-2.jpg";
import IconSearch from "@/components/icons/IconSearch";
import IconWater from "@/components/icons/IconWater";
import IconDesign from "@/components/icons/IconDesign";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";

import demo_goc_chuyen_gia from "../../../../public/images/goc-chuyen-gia/demo_chuuyen_gia.png";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";
import Link from "next/link";

const searchData = {
  populate: ["seo.thumbnail", "danh_muc_bai_viets "].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(params: any): Promise<Metadata> {
  const dataBaiViet = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?${searchParams}}&locale=${params.params.locale}`
  );
  const seo =
    (dataBaiViet as { data: { attributes: { main: { seo: any } } } })?.data
      ?.attributes?.main?.seo || {};

  const baseUrl = process.env.URL_API;

  return {
    metadataBase: new URL(baseUrl || ""),
    title: seo.title || "Tin tức - Công ty TNHH Kỹ thuật NTS",
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
      url: `${baseUrl}/tin-tuc`,
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
        seo.twitterTitle || seo.title || "Tin tức - Công ty TNHH Kỹ thuật NTS",
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

  const dataTinTuc = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?${searchParams}}&locale=${params.params.locale}`
  );
  const baseUrl = process.env.URL_API;
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

  const tintuc = baiViet.data
    .filter((item) => item?.attributes?.type === "Tin tức")
    .map((item) => item.attributes);
  const baiVietTieuDiem = tintuc
    .filter((item) => item?.bai_viet_tieu_diem === true)
    .map((item) => item);
  console.log("tin tuc", baiVietTieuDiem);

  return (
    <>
      <div className="container py-[32px] desktop:py-[50px]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 laptop:col-span-6">
            <TintucNoibat data={baiVietTieuDiem} name="Bài viết nổi bật" />
          </div>
          <div className="col-span-12 laptop:col-span-6">
            <h2 className="text-[24px] font-bold text-[#374151]">
              Tin mới lên
            </h2>
            {tintuc &&
              tintuc.map((item) => {
                return (
                  <div key={item.id} className="py-[16px]">
                    <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                      <div className="col-span-7">
                        <div className="flex flex-col gap-[16px]">
                          <div className="w-24 h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
                            <div className="text-indigo-800 text-base font-normal leading-normal">
                              Mới đây
                            </div>
                          </div>
                          <h3 className="text-[20px] text-[#374151] font-[500]">
                            {item.title}
                          </h3>
                          <p className="text-[18px] text-[#8899A8]">
                            {item.seo.description}
                          </p>
                          <div className="flex justify-start">
                            <Link
                              href={`/${item.slug}`}
                              className="text-[#3B559E] px-[24px] py-[8px] rounded-[50px] btn-view"
                            >
                              Đọc ngay
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-5">
                        <div className="">
                          <Image
                            height={196}
                            width={196}
                            src={`${baseUrl}${item.seo.thumbnail.data.attributes.url}`}
                            layout="responsive"
                            alt="tin-tuc-moi-len"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="py-[40px]">
          <hr />
        </div>

        <div className="flex justify-between flex-wrap ">
          <div>
            <h2 className="text-[35px] font-bold">Tất cả bài viết</h2>
          </div>
          <div className="relative">
            <input
              className="focus:outline-none p-[24px] rounded-[56px] border border-[#DFE4EA] bg-[#FFFFFF] placeholder:font-[300] placeholder:italic placeholder:text-[#8899A8]"
              placeholder="Nhập từ khóa tìm kiếm"
            />
            <button className="w-[56px] h-[56px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[2%] top-[10%]">
              <IconSearch />
            </button>
          </div>
        </div>

        <div className="py-[50px]">
          <div className="flex">
            <button className="bg-[#3B559E] py-[8px] px-[10px] flex items-center rounded-[24px] border border-[#3B559E]">
              <IconWater />
              <span className="text-12px font-medium text-[#fff] ml-[8px]">
                Xử lý nước
              </span>
            </button>
            <button className="bg-[#fff] py-[8px] px-[10px] flex items-center rounded-[24px] ml-[8px] border  border-[#3B559E]">
              <IconDesign />
              <span className="text-12px font-medium text-[#3B559E] ml-[8px]">
                Thiết kế cơ điện
              </span>
            </button>
          </div>
        </div>

        <BoxTinTuc data={tintuc} />
        <div className="py-[40px] flex justify-center">
          <button className="py-[16px] px-[24px] bg-[#3B559E] border border-[#3B559E] text-[#fff] font-medium rounded-[50px]">
            Tải thêm bài viết
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
