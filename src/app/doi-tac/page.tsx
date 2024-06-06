import Image from "next/image";
import cong_ty_thanh_vien from "../../../public/images/ve-chung-toi/doi-tac-lien-ket.png";
import "../../styles/pages/home.css";
import IconAngleRight from "@/components/icons/IconAngleRight";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import ListMember from "@/components/ListMember";

const searchData = {
  populate: [
    "description",
    "banner.urlImage",
    "seo.thumbnail",
    "cardThanhVien.logo",
  ].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(): Promise<Metadata> {
  const dataDoiTac = await fetchData();
  const seo =
    (dataDoiTac as { data: { attributes: { seo: any } } })?.data?.attributes
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

async function fetchData() {
  try {
    const data = await apiService.get(`${ENDPOINT.GET_DOITAC}?${searchParams}`);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const page: React.FC = async () => {
  const dataDoiTac = await fetchData();
  const baseUrl = process.env.URL_API;
  const description = (
    dataDoiTac as { data: { attributes: { description: string } } }
  )?.data?.attributes?.description;
  const banner = (
    dataDoiTac as {
      data: {
        attributes: {
          banner: { urlImage: { data: { attributes: { url: string } } } };
        };
      };
    }
  )?.data?.attributes?.banner?.urlImage?.data?.attributes?.url;
  const listMember = (
    dataDoiTac as {
      data: {
        attributes: {
          cardThanhVien: {
            id: number;
            title: string;
            description: string;
            path: string;
            logo: {
              data: {
                attributes: {
                  width: number;
                  height: number;
                  url: string;
                };
              };
            };
          }[];
        };
      };
    }
  )?.data?.attributes?.cardThanhVien;

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
          src={`${baseUrl}${banner}`}
          alt="banner"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="desktop:pt-[80px] pt-[32px] pb-[64px]">
        <div className="flex flex-col gap-[24px] desktop:gap-[40px] text-center">
          <h5 className="text-[#28A645] text-[16px] desktop:text-[20px] font-medium">
            ĐỐI TÁC LIÊN KẾT
          </h5>
          <h1 className="text-[24px] desktop:text-[54px] font-bold">
            Hợp tác chiến lược
          </h1>
          <p>{description && description}</p>
        </div>
      </div>
      <ListMember listMember={listMember} />
    </>
  );
};

export default page;
