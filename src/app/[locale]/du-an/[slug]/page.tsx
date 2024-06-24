import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import { Pagination } from "antd";
import "../../../../styles/pages/luat-bao-ve-moi-truong.css";
import { apiService } from "@/services/api.service";
import { useRouter } from "next/router";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";
const searchData = {
  populate: ["bai_viets.seo.thumbnail"].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(params: any): Promise<Metadata> {
  const dataDanhMucCon = await fetchData(
    `${ENDPOINT.GET_DANHMUCCON}?${searchParams}&locale=${params.params.locale}`
  );

  const detailDanhMucCon = dataDanhMucCon as {
    data: {
      id: number;
      attributes: {
        name: string;
        slug: string;
        description: string;
        locale: string;
        bai_viets: {
          data: {
            id: number;
            attributes: {
              id: number;
              title: string;
              slug: string;
              type: string;
              locale: string;
              content: string;
              bai_viet_tieu_diem: Boolean;
              seo: {
                id: number;
                title: string;
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
      };
    }[];
  };
  const filteredDanhMucCon = detailDanhMucCon.data.filter(
    (item: any) => item.attributes.slug === params.params.slug
  );

  const title = filteredDanhMucCon[0]?.attributes?.name ?? "";
  const baseUrl = process.env.URL_API;

  return {
    metadataBase: new URL(baseUrl || ""),
    title: title || "Tin tức - Công ty TNHH Kỹ thuật NTS",
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
  const slug = params.params.slug;

  const data = await fetchData(
    `${ENDPOINT.GET_DANHMUCCON}?${searchParams}&locale=${locale}&filters[slug]=${slug}`
  );

  const detailData = data as {
    data: {
      id: number;
      attributes: {
        name: string;
        slug: string;
        description: string;
        locale: string;
        bai_viets: {
          data: {
            id: number;
            attributes: {
              id: number;
              title: string;
              slug: string;
              type: string;
              locale: string;
              content: string;
              bai_viet_tieu_diem: Boolean;
              seo: {
                id: number;
                title: string;
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
      };
    }[];
  };

  // const baiViet = data as {
  //   data: {
  //     id: number;
  //     attributes: {
  //       createdAt: Date;
  //       updatedAt: Date;
  //       publishedAt: Date;
  //       locale: string;

  //       name: string;
  //       subTitle: string;
  //       id: number;
  //       title: string;
  //       slug: string;
  //       description: string;
  //       seo: {
  //         title: string;
  //         description: string;

  //         ogTitle: string;
  //         ogDescription: string;
  //         thumbnail: {
  //           data: {
  //             attributes: {
  //               url: string;
  //             };
  //           };
  //         };
  //       };
  //       bai_viets: {
  //         data: {
  //           id: number;
  //           attributes: {
  //             id: number;
  //             title: string;
  //             description: string;
  //             slug: string;
  //             type: string;
  //             locale: string;
  //             subTitle: string;

  //             seo: {
  //               title: string;
  //               description: string;
  //               ogTitle: string;
  //               ogDescription: string;
  //               thumbnail: {
  //                 data: {
  //                   attributes: {
  //                     url: string;
  //                   };
  //                 };
  //               };
  //             };
  //           };
  //         }[];
  //       };
  //     };
  //   }[];
  // };
  // const main = baiViet.data.filter((item) => item.attributes.slug === slug);

  const filteredData = detailData.data[0].attributes.bai_viets.data.map(
    (item) => {
      const { title, slug, locale, seo, id } = item.attributes;
      return {
        id,
        title,
        slug,
        locale,
        seo,
      };
    }
  );

  return (
    <>
      <div className="desktop:pt-[80px] pt-[32px] pb-[64px] container">
        <div className="flex flex-col gap-[24px] desktop:gap-[40px] text-center">
          <h5 className="text-[#28A645] text-[16px] desktop:text-[20px] font-medium">
            Dự án
          </h5>
          <h1 className="text-[24px] desktop:text-[54px] font-bold">
            {detailData.data[0].attributes.name}
          </h1>
          <p className="text-[#8899A8]">
            {detailData.data[0].attributes.description}
          </p>
        </div>
      </div>
      <div className="container">
        {detailData ? <BoxTinTuc data={filteredData} /> : "khong co data"}
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
