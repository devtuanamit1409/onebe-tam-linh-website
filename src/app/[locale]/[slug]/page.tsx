"use server";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { apiService } from "@/services/api.service";
import { Breadcrumb } from "antd";
import notFoundBanner from "../../../../public/images/banner/404Banner.png";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface baiviet {}

const searchData = {
  populate: ["seo.thumbnail", "danh_muc_bai_viets"].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const dataBaiViet = await fetchData(params.locale);
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

async function fetchData(locale: string) {
  try {
    const data = await apiService.get(
      `${ENDPOINT.GET_BAIVIET}?locale=${locale}&${searchParams}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const DetailPage = async ({
  params,
}: {
  params: { locale: string; slug: string };
}) => {
  const { locale, slug } = params;
  const dataTinTuc = await fetchData(locale);
  console.log(`locale: ${locale}, slug: ${slug}`);

  async function fetchDataBaiViet() {
    try {
      const data = await apiService.get(
        `${ENDPOINT.GET_BAIVIET}?filters[slug]=${slug}&locale=${locale}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  const resBaiViet: any = await fetchDataBaiViet();
  const dataBaiViet = resBaiViet?.data[0]?.attributes?.content;

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

  return (
    <>
      {resBaiViet?.data[0] ? (
        <>
          <div className=" bg-gray-50 ">
            <div className="container mx-auto py-4 text-gray-500 text-base font-medium leading-normal">
              {/* <Breadcrumb separator="/">
            <Breadcrumb.Item>
              <Link className="hover:bg-transparent !bg-transparent" href="/">
                Trang chủ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                className="hover:bg-transparent !bg-transparent"
                href="/san-pham">
                Sản phẩm
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                className="hover:bg-transparent !bg-transparent"
                href="/vat-lieu-moi-thiet-bi-plastic-nganh-nuoc">
                Vật liệu mới, thiết bị plastic ngành nước
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Hệ thống lọc tổng</Breadcrumb.Item>
          </Breadcrumb> */}
            </div>
          </div>
          <div className="container">
            <p className="text-center text-green-600 text-xl font-medium leading-normal tablet:my-6 mobile:my-4">
              SẢN PHẨM
            </p>
            <h2 className="text-gray-800 text-5xl font-bold leading-normal text-center">
              {resBaiViet?.data[0]?.attributes?.title}
            </h2>

            <div
              className="blog-content desktop:py-[40px] desktop:px-[120px] mobile:px-0 mobile:pb-[20px]"
              dangerouslySetInnerHTML={{
                __html: dataBaiViet ? dataBaiViet : "",
              }}
            />

            <ContactEnd />
          </div>
        </>
      ) : (
        <>
          <div className="relative h-[80vh] min-h-[400px]">
            <Image src={notFoundBanner.src} alt="" layout="fill" />
            <div className="w-full h-full absolute flex flex-col justify-center items-center gap-[35px]">
              <h2 className="text-center text-white text-[100px] font-bold leading-[130px]">
                404
              </h2>
              <p className="text-center text-white text-[22px] font-semibold leading-normal">
                Oops! That page can’t be found
              </p>
              <p className="text-center text-white text-base font-normal leading-normal">
                The page you are looking for it maybe deleted
              </p>

              <Link
                href="/"
                className="min-w-[187px] h-12 px-6 py-3 rounded-md border border-white justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal">
                Quay lại trang chủ
              </Link>
            </div>
          </div>
        </>
      )}

      <div className="bg-[#F3F6FE] py-[80px]">
        <div className="container">
          <div className="inline-flex justify-between items-center w-full py-2 pb-[40px]">
            <h2 className="text-black text-[32px] font-bold capitalize leading-[51.20px]">
              Tin Tức
            </h2>
            <Link
              href={"/"}
              className="text-center text-indigo-800 text-base font-medium leading-normal inline-flex gap-2.5">
              Tới trang tin tức <IconArrowRight width={20} height={20} />
            </Link>
          </div>
          <BoxTinTuc data={tintuc.slice(0, 3)} />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
