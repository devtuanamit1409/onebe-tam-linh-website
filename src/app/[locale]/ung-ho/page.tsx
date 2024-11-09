"use server";
import IconAngleRightColorFull from "@/components/icons/IconAngleRightColorFull";
import bannerDichVu from "../../../../public/images/banner/banner-dich-vu.png";
import Image from "next/image";
import Link from "next/link";

import PageMenu from "@/components/PageMenu";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
interface DataVeChungToi {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string;
      content: string;
      seo: any;
    };
  };
  meta: object;
}
const searchData = {
  populate: ["seo", "seo.thumbnail"].toString(),
};

const searhDichVu = {
  populate: ["main.seo.thumbnail", "main.banner.urlImage"].toString(),
};
const searchParamsDichVu = new URLSearchParams(searhDichVu).toString();

const searchParams = new URLSearchParams(searchData).toString();
export async function generateMetadata(params: any): Promise<Metadata> {
  const dataVeChungToi = await fetchData(
    `${ENDPOINT.GET_TTND}?populate=seo,seo.thumbnail&locale=${params.params.locale}`
  );

  const seo =
    (dataVeChungToi as { data: { attributes: { seo: any } } })?.data?.attributes
      ?.seo || {};

  const baseUrl = process.env.URL_API;
  const t = await getTranslations("detail_post");

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
    alternates: {
      canonical: "https://ntse.vn/ve-chung-toi",
    },
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
    robots: "noodp,index,follow",
    other: {
      "http-equiv": "content-language",
      content: "vi",
    },
    publisher: "https://maps.app.goo.gl/gcCxAPv43RtkVjvF9",
  };
}

async function fetchData(endpoint: any) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const page = async (params: any) => {
  const locale = params.params.locale;

  const dataTinTuc = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?${searchParams}&locale=${locale}`
  );

  const dataDichVu = await fetchData(
    `${ENDPOINT.GET_TTND}?${searchParamsDichVu}&locale=${locale}`
  );

  const dichVu = (
    dataDichVu as {
      data: {
        attributes: {
          main: {
            banner: {
              urlImage: {
                data: {
                  attributes: {
                    url: string;
                  };
                };
              };
            };
            main: any;
            name: string;
            description: string;
          };
        };
      };
    }
  )?.data?.attributes?.main;

  const dataVeChungToi = await fetchData(
    `${ENDPOINT.GET_TTND}?populate=seo,seo.thumbnail&locale=${params.params.locale}`
  );

  const content = (dataVeChungToi as any)?.data?.attributes?.content;
  console.log(content);

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

  const dataDanhMuc = await fetchData(
    `${ENDPOINT.GET_DANHMUCCON}?filters[category][$eqi]=Thông tư nghị định&locale=${locale}`
  );
  const danhMuc = (
    dataDanhMuc as {
      data: {
        attributes: {
          name: string;
          slug: string;
          description: string;
          danh_muc_cons: {
            data: {
              attributes: {
                name: string;
                slug: string;
                description: string;
                bai_viets: {
                  data: {
                    attributes: {
                      title: string;
                      slug: string;
                      content: string;
                      type: string;
                      bai_viet_tieu_diem: boolean;
                      seo: {
                        title: string;
                        description: string;
                        keyword: string;
                      };
                    };
                  }[];
                };
              };
            }[];
          };

          bai_viets: {
            data: {
              attributes: {
                title: string;
                slug: string;
                content: string;
                type: string;
                bai_viet_tieu_diem: boolean;
                seo: {
                  title: string;
                  description: string;
                  keyword: string;
                };
              };
            }[];
          };
        };
      }[];
    }
  )?.data;

  const dichVuMenu = danhMuc.filter((item) =>
    locale === "vi"
      ? item.attributes.slug === "thong-tu-nghi-dinh"
      : item.attributes.slug === "regulations-ordinances"
  );
  const t = await getTranslations("detail_post");
  const translate = await getTranslations("menu");

  return (
    <div>
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
      <div className="container">
        <ContactEnd />
      </div>
    </div>
  );
};
export default page;
