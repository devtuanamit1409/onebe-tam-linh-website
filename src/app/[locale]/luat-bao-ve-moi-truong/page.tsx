import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import { Pagination } from "antd";
import "../../../styles/pages/luat-bao-ve-moi-truong.css";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";
const searchData = {
  populate: ["seo.thumbnail", "bai_viets.seo.thumbnail"].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(params: any): Promise<Metadata> {
  const dataBaiViet = await fetchData(
    `${ENDPOINT.GET_CHILDTTND}?${searchParams}&locale=${params.params.locale}`
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
  const locale = params.params.locale;
  const data = await fetchData(
    `${ENDPOINT.GET_CHILDTTND}?${searchParams}&locale=${locale}`
  );

  const baiViet = data as {
    data: {
      id: number;
      attributes: {
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        locale: string;

        name: string;
        subTitle: string;
        id: number;
        title: string;
        slug: string;
        description: string;
        seo: {
          title: string;
          description: string;

          ogTitle: string;
          ogDescription: string;
          thumbnail: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
        bai_viets: {
          data: {
            id: number;
            attributes: {
              id: number;
              title: string;
              description: string;
              slug: string;
              type: string;
              locale: string;
              subTitle: string;

              seo: {
                title: string;
                description: string;
                ogTitle: string;
                ogDescription: string;
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
      };
    }[];
  };
  const main = baiViet.data.filter(
    (item) => item.attributes.slug === "luat-bao-ve-moi-truong"
  );
  console.log("params", params);

  // console.log("main", main[0]);
  const filteredData = main[0].attributes.bai_viets.data.map((item) => {
    const { title, slug, locale, subTitle, seo, id } = item.attributes;
    return {
      id,
      title,
      slug,

      locale,
      subTitle,
      seo,
    };
  });

  return (
    <>
      <div className="desktop:pt-[80px] pt-[32px] pb-[64px] container">
        <div className="flex flex-col gap-[24px] desktop:gap-[40px] text-center">
          <h5 className="text-[#28A645] text-[16px] desktop:text-[20px] font-medium">
            {main[0].attributes.subTitle}
          </h5>
          <h1 className="text-[24px] desktop:text-[54px] font-bold">
            {main[0].attributes.name}
          </h1>
          <p className="text-[#8899A8]">{main[0].attributes.description}</p>
        </div>
      </div>
      <div className="container">
        {main ? <BoxTinTuc data={filteredData} /> : "khong co data"}
      </div>
      {filteredData && filteredData.length > 6 ? (
        <div className="py-[40px] container flex justify-center">
          <Pagination defaultCurrent={1} total={500} showSizeChanger={false} />
        </div>
      ) : null}
    </>
  );
};

export default page;
