"use server";
import Loading from "@/components/Loading";
import DetailDanhMuc from "@/components/DetailDanhMuc";
import DetailNew from "@/components/DetailNew";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

interface Article {
  id: number;
  attributes: {
    seo: any;
    title: string;
    content: string;
    slug: string;
    subTitle?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    type: string | null;
  };
}

interface DetailSubCategory {
  id: number;
  attributes: {
    seo: any;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    category: string;
    content: string;
  };
}

interface DetailArticle {
  id: number;
  attributes: {
    seo: any;
    title: string;
    slug: string;
    content: string;
    bai_viet_tieu_diem: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    type: string | null;
    localizations?: {
      data: Array<{
        attributes: {
          content: string;
        };
      }>;
    };
    danh_muc_cons: {
      data: DetailSubCategory[];
    };
  };
}

interface PageParams {
  slug: string;
  locale: string;
}

async function fetchData(endpoint: string) {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.DEV_TOKEN}`,
    },
  });
  return response.json();
}

// Metadata generation function
export async function generateMetadata(params: any): Promise<Metadata> {
  const { slug, locale } = params.params;

  console.log("params", params);

  const dataVeChungToi = await fetchData(
    `${ENDPOINT.GET_DUAN}?filters[slug]=${slug}&locale=${locale}`
  );

  const seo =
    (dataVeChungToi as { data: { attributes: { main: { seo: any } } } })?.data
      ?.attributes?.main?.seo || {};

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
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.ogDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      url: `${baseUrl}/du-an/${slug}`,
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

async function Page({ params }: { params: PageParams }) {
  const { slug, locale } = params;

  const translate404 = await getTranslations("404");
  const t = await getTranslations("detail_post");

  // Fetch data for rendering
  const dataResponse = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?populate=seo.thumbnail&danh_muc_cons&filters[danh_muc_cons][slug][$eq]=${slug}&locale=${locale}&sort=createdAt:DESC`
  );
  const subCategoryResponse = await fetchData(
    `${ENDPOINT.GET_DANHMUCCON}?filters[slug]=${slug}&locale=${locale}&populate=seo.thumbnail`
  );
  const baiVietResponse = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?filters[slug]=${slug}&locale=${locale}&populate=localization,category_details.childrens,seo.thumbnail,danh_muc_cons,localizations`
  );

  // Process data
  const articles = dataResponse.data || [];
  const subCategories = subCategoryResponse.data || [];
  const baiVietDetails = baiVietResponse.data || [];

  const seoCategory = subCategories[0]?.attributes?.seo || null;
  const seoDetailNews = baiVietDetails[0]?.attributes?.seo || null;

  // Filtered and processed data
  const filteredArticles = articles.map((item: Article) => ({
    id: item.id,
    ...item.attributes,
  }));

  const breadcum =
    baiVietDetails[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
      ?.category || "";

  const subBreadcum =
    baiVietDetails[0]?.attributes?.danh_muc_cons?.data[0]?.attributes?.name ||
    "";

  const slugSubBreadcum =
    baiVietDetails[0]?.attributes?.danh_muc_cons?.data[0]?.attributes?.slug ||
    "";

  return (
    <>
      {/* Content rendering */}
      {filteredArticles.length > 0 ? (
        <DetailDanhMuc
          detailSubCategory={subCategories[0]?.attributes || null}
          filteredData={filteredArticles}
          pagination={{ current: 1, pageSize: 6, total: articles.length }}
          locale={locale}
          loading={false}
        />
      ) : (
        <DetailNew
          detailBaiViet={baiVietDetails[0]?.attributes || null}
          detailCategory={baiVietDetails[0]?.attributes || null}
          locale={locale}
          breadcum={breadcum}
          subBreadcum={subBreadcum}
          slugSubBreadcum={slugSubBreadcum}
          recomenData={filteredArticles}
        />
      )}
    </>
  );
}

export default Page;
