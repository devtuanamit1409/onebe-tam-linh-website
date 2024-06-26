"use server";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { apiService } from "@/services/api.service";
import { Breadcrumb, Pagination } from "antd";
import notFoundBanner from "../../../../public/images/banner/404Banner.png";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { useParams } from "next/navigation";

const DetailPage = async ({ params }: { params: any }) => {
  async function fetchData(endpoint: string) {
    try {
      const data = await apiService.get(endpoint);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  const checkLastSegmentIsNumeric = (input: string) => {
    const segments = input.split("-");
    const lastSegment = segments[segments.length - 1];
    return /^\d+$/.test(lastSegment);
  };
  const slug = params.slug;
  const t = await getTranslations("detail_post");
  let locale = params.locale;
  const page = params.page || 1;
  const detailSubCategory: any = await fetchData(
    `${ENDPOINT.GET_DANHMUCCON}?filters[slug]=${slug}&locale=${locale}`
  );

  const detailBaiViet: any = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?populate=seo.thumbnail&danh_muc_cons&filters[danh_muc_cons][slug][$eq]=${slug}&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=6`
  );

  const baiVietLienQuan: any = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?populate=seo.thumbnail&locale=${locale}&filters[bai_viet_tieu_diem]=true`
  );

  const filteredData = detailBaiViet.data.map((item: any) => {
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

  const recomenData = baiVietLienQuan.data.map((item: any) => {
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

  const detailEndpoint = `${ENDPOINT.GET_BAIVIET}?filters[slug]=${params.slug}&populate=localizations&locale=${locale}&populate=danh_muc_cons`;
  async function fetchDataBaiViet() {
    try {
      const data = await apiService.get(detailEndpoint);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  const resBaiViet: any = await fetchDataBaiViet();
  const dataBaiViet =
    locale === "vi"
      ? resBaiViet?.data[0]?.attributes?.content
      : resBaiViet?.data[0]?.attributes?.localizations.data[0].attributes
          .content;

  let breadcum: any;
  let subBreadcum: any;

  !checkLastSegmentIsNumeric(slug)
    ? (breadcum =
        locale === "vi"
          ? resBaiViet.data[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
              ?.category
          : resBaiViet.data[0]?.attributes?.localizations?.danh_muc_cons
              ?.data[0]?.attributes?.category)
    : "";

  !checkLastSegmentIsNumeric(slug)
    ? (subBreadcum =
        locale === "vi"
          ? resBaiViet.data[0]?.attributes?.danh_muc_cons?.data[0]?.attributes
              ?.name
          : resBaiViet.data[0]?.attributes?.localizations?.danh_muc_cons
              ?.data[0]?.attributes?.name)
    : "";
  // code lỏ
  const DetailNew = () => {
    return (
      <>
        {resBaiViet?.data[0] ? (
          <>
            <div className=" bg-gray-50 ">
              <div className="container mx-auto py-4 text-gray-500 text-base font-medium leading-normal">
                <Link href={"/"}>Trang chủ</Link>
                <span className="mx-2"> / </span>
                <Link href={``}>{breadcum}</Link>
                {breadcum ? <span className="mx-2"> / </span> : null}
                <Link href={``}>{subBreadcum}</Link>
                {subBreadcum ? <span className="mx-2 "> / </span> : null}
                <Link className="text-[#000]" href={``}>
                  {resBaiViet?.data[0]?.attributes?.title}
                </Link>
              </div>
            </div>
            <div className="container">
              <p className="text-center text-green-600 text-xl font-medium leading-normal tablet:my-6 mobile:my-4">
                {breadcum}
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
                  className="min-w-[187px] h-12 px-6 py-3 rounded-md border border-white justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal"
                >
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
                {t("title_post")}
              </h2>
              <Link
                href={`/${locale}/tin-tuc`}
                className="text-center text-[#3B559E] text-base font-medium leading-normal inline-flex  items-center gap-2.5"
              >
                {t("go_to_news_page")}
                <IconArrowRight width={20} height={20} />
              </Link>
            </div>
            <BoxTinTuc data={recomenData.slice(0, 3)} />
          </div>
        </div>
      </>
    );
  };

  const DetailDanhMuc = () => {
    return (
      <>
        <div className="desktop:pt-[80px] pt-[32px] pb-[64px] container">
          <div className="flex flex-col gap-[24px] desktop:gap-[40px] text-center">
            <h5 className="text-[#28A645] text-[16px] desktop:text-[20px] font-medium">
              {detailSubCategory.data[0].attributes.category}
            </h5>
            <h1 className="text-[24px] desktop:text-[54px] font-bold">
              {detailSubCategory.data[0].attributes.name}
            </h1>
            <p className="text-[#8899A8]">
              {detailSubCategory.data[0].attributes.description}
            </p>
          </div>
        </div>
        <div className="container">
          {filteredData.length > 0 ? <BoxTinTuc data={filteredData} /> : <></>}
        </div>
        <div className="py-[40px] container flex justify-center">
          <Pagination
            pageSize={1}
            total={detailBaiViet?.meta?.pagination?.total}
            showSizeChanger={false}
          />
        </div>
      </>
    );
  };

  return (
    <>{checkLastSegmentIsNumeric(slug) ? <DetailDanhMuc /> : <DetailNew />}</>
  );
};

export default DetailPage;
