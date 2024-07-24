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
import { getTranslations } from "next-intl/server";

const searchData = {
  populate: [
    "main.seo.thumbnail",
    "main.content",
    // "main.videoAbout",
    // "main.boxAbout",
    // "main.cacTongThau",
    // "main.cacDoiTacNuocNgoai",
    // "main.cacChuDauTuNuocNgoai",
    // "main.cacCongTyVaTapDoan",
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
  const t = await getTranslations("aboutUs");
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
  const content = (dataVeChungToi as { data: { attributes: { main: any } } })
    .data.attributes.main;

  return (
    <>
      <div className=" justify-center ">
        <div className="container">
          {content ? (
            <div
              className="blog-content pt-[40px]"
              dangerouslySetInnerHTML={{
                __html: content.content ? content.content : "",
              }}
            />
          ) : (
            "chưa cms"
          )}
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
