import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import { Pagination } from "antd";
import "../../../styles/pages/luat-bao-ve-moi-truong.css";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";
const searchData = {
  populate: ["seo.thumbnail", "danh_muc_bai_viets "].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(): Promise<Metadata> {
  const dataBaiViet = await fetchData();
  const seo =
    (dataBaiViet as { data: { attributes: { seo: any } } })?.data?.attributes
      ?.seo || {};

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
async function fetchData() {
  try {
    const data = await apiService.get(
      `${ENDPOINT.GET_BAIVIET}?${searchParams}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const page = async () => {
  const dataTinTuc = await fetchData();

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
  const data_tin_tuc = [
    {
      url: "/images/tin-tuc/tin-tuc-1.jpg",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-2.jpg",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-3.jpg",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-1.jpg",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-2.jpg",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-3.jpg",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];
  return (
    <>
      <div className="desktop:pt-[80px] pt-[32px] pb-[64px]">
        <div className="flex flex-col gap-[24px] desktop:gap-[40px] text-center">
          <h5 className="text-[#28A645] text-[16px] desktop:text-[20px] font-medium">
            THÔNG TƯ - NGHỊ ĐỊNH
          </h5>
          <h1 className="text-[24px] desktop:text-[54px] font-bold">
            Luật bảo vệ môi trường
          </h1>
          <p className="text-[#8899A8]">
            This is a short discription about this content This is a short
            discription about this content This is a short discription about
            this content This is a short discription about this content This is
            a short discription about this content This is a short discription
            about this content This is a short discription about this content
            This is a short discription about this content This is a short
            discription about this content
          </p>
        </div>
      </div>
      <div className="container">
        <BoxTinTuc data={tintuc} />
      </div>
      <div className="py-[40px] container flex justify-center">
        <Pagination defaultCurrent={1} total={500} showSizeChanger={false} />
      </div>
    </>
  );
};

export default page;
