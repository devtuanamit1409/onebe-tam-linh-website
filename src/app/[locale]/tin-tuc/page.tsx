"use client";
import React, { useEffect, useState } from "react";
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
import Loading from "@/components/Loading";
import { useTranslations } from "use-intl";

interface danhMucBaiViet {
  id: number;
  attributes: {
    name: string;
  };
}
interface tintuc {
  id: number;
  attributes: {
    createdAt: string;
    title: string;
    slug: string;
    type: string;
    bai_viet_tieu_diem: boolean;
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
    danh_muc_bai_viets: {
      data: {
        attributes: {
          name: string;
        };
      }[];
    };
  };
}
interface ResponseDataTinTuc {
  data: tintuc[];
}
interface ResponseDanhMucBaiViet {
  data: danhMucBaiViet[];
}
const searchData = {
  populate: ["seo.thumbnail", "danh_muc_bai_viets "].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();

const Page: React.FC = (params: any) => {
  let locale = params.params.locale;
  const [dataDanhMucBaiViet, setDataDanhMucBaiViet] = useState<
    danhMucBaiViet[]
  >([]);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [tintuc, setTintuc] = useState<tintuc[]>([]);
  const [tintucWithFilter, setTintucWithFilter] = useState<tintuc[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterDanhMuc, setFilterDanhMuc] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchValue(searchValue), 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  // useEffect(() => {
  //   if (debouncedSearchValue) {
  //     console.log("Searching for:", debouncedSearchValue);
  //   }
  // }, [debouncedSearchValue]);
  const fetchDataTinTuc = async () => {
    try {
      setLoading(true);
      const endpoint = `${process.env.URL_API}/api/bai-viets?${searchParams}&locale=${locale}&filters[type][$containsi]=Tin tức&sort=createdAt:DESC `;
      const response = await apiService.get<ResponseDataTinTuc>(endpoint);
      setTintuc(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataTinTucWithFilter = async () => {
    try {
      setLoading(true);
      const endpoint = `${process.env.URL_API}/api/bai-viets?${searchParams}&locale=${locale}&filters[title][$containsi]=${debouncedSearchValue}&filters[type][$containsi]=Tin tức&pagination[pageSize]=${displayedCount}&sort=createdAt:DESC`;
      const response = await apiService.get<ResponseDataTinTuc>(endpoint);
      setTintucWithFilter(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataDanhMucBaiViet = async () => {
    try {
      const endpoint = `${process.env.URL_API}/api/danh-muc-bai-viets?locale=${locale}`;
      const response = await apiService.get<ResponseDanhMucBaiViet>(endpoint);
      setDataDanhMucBaiViet(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataTinTuc();
    fetchDataDanhMucBaiViet();
  }, []);
  useEffect(() => {
    fetchDataTinTucWithFilter();
  }, [debouncedSearchValue, displayedCount]);

  const baseUrl = process.env.URL_API;

  const handleSetFilterDanhMuc = (name: string) => {
    if (filterDanhMuc === name) {
      setFilterDanhMuc("");
    } else {
      setFilterDanhMuc(name);
    }
  };
  const filteredAndLimitedArticles = tintucWithFilter
    .filter((item: tintuc) => {
      // const isExpertArticle = item.attributes.type === "Bài viết chuyên gia";
      // if (!isExpertArticle) {
      //   return false;
      // }

      if (filterDanhMuc === "") {
        return true;
      }

      return item?.attributes?.danh_muc_bai_viets?.data.some(
        (danhMuc) => danhMuc.attributes?.name === filterDanhMuc
      );
    })
    .map((item: tintuc) => item?.attributes);
  const loadMoreArticles = () => {
    setDisplayedCount((prevCount) => prevCount + 6);
  };
  const t = useTranslations("detail_post");

  const checkIfCreatedWithin24Hours = (createdAtStr: string): boolean => {
    const createdAt = new Date(createdAtStr);
    const now = new Date();
    const timeDifference = now.getTime() - createdAt.getTime();
    return timeDifference <= 24 * 60 * 60 * 1000; // 24 giờ tính bằng milliseconds
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="container py-[32px] desktop:py-[50px]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 laptop:col-span-6">
            <TintucNoibat
              data={tintuc
                .filter((item) => item?.attributes?.bai_viet_tieu_diem === true)
                .map((item) => item?.attributes)}
              name={t("features_article")}
            />
          </div>
          <div className="col-span-12 laptop:col-span-6">
            <h2 className="text-[24px] font-bold text-[#374151]">
              {t("lastest_news")}
            </h2>
            {tintuc &&
              tintuc.slice(0, 3).map((item) => {
                console.log("item", item.attributes.createdAt);
                return (
                  <div key={item.id} className="py-[16px]">
                    <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                      <div className="tablet:col-span-7 mobile:col-span-12">
                        <div className="flex flex-col gap-[16px]">
                          <div className="w-[108px] h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
                            <div className="text-[#3B559E] text-base font-normal leading-normal">
                              {item.attributes.createdAt
                                ? checkIfCreatedWithin24Hours(
                                    item.attributes.createdAt
                                  )
                                  ? t("lastest_news_tag")
                                  : formatDate(item.attributes.createdAt)
                                : t("lastest_news_tag")}
                            </div>
                          </div>
                          <h3 className="text-[20px] text-[#374151] font-bold line-clamp-2">
                            {item?.attributes?.seo?.description || "có lỗi"}
                          </h3>
                          <p className="text-[18px] text-[#8899A8] line-clamp-3">
                            {item?.attributes?.seo?.description || "có lỗi"}
                          </p>
                          <div className="flex justify-start">
                            <Link
                              href={`/${item.attributes.slug}`}
                              className="text-[#3B559E] px-[24px] py-[8px] rounded-[50px] btn-view">
                              {t("read_now")}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="tablet:col-span-5 mobile:col-span-12">
                        <div className="mobile:min-w-[196px] mobile:min-h-[196px] tablet:aspect-square laptop:max-w-[196px] tablet:min-h-[100px] tablet:min-w-[100px] relative mobile:mx-auto">
                          <Image
                            // height={196}
                            // width={196}
                            src={`${baseUrl}${item.attributes.seo.thumbnail.data.attributes.url}`}
                            fill
                            objectFit="cover"
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

        <div className="flex tablet:flex-row mobile:flex-col  justify-between ">
          <div>
            <h2 className="text-[35px] font-bold">{t("news")}</h2>
          </div>
          <div className="relative">
            <input
              className="focus:outline-none laptop:p-[24px] mobile:px-[24px] mobile:py-[3px] mobile:w-full tablet:w-fit rounded-[56px] border border-[#DFE4EA] bg-[#FFFFFF] placeholder:font-[300] placeholder:italic placeholder:text-[#8899A8]"
              onChange={(e: any) => setSearchValue(e.target.value)}
              placeholder={t("search")}
            />
            <button className="w-[56px] h-[56px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[2%] top-[10px] mobile:hidden laptop:flex">
              <IconSearch width="30" height="30" />
            </button>
            <button className="w-[32px] h-[32px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[0px] top-[0px] mobile:flex laptop:hidden">
              <IconSearch width="14" height="14" />
            </button>
          </div>
        </div>

        <div className="py-[50px]">
          <div className="flex gap-4">
            {dataDanhMucBaiViet && dataDanhMucBaiViet.length > 0
              ? dataDanhMucBaiViet.map((item: danhMucBaiViet) => {
                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        handleSetFilterDanhMuc(item?.attributes?.name)
                      }
                      className={`${
                        filterDanhMuc === item?.attributes?.name
                          ? `bg-[#3B559E] border-[#3B559E]`
                          : `bg-[#fff] border  border-[#3B559E]`
                      } py-[8px] px-[10px] flex items-center rounded-[24px] border`}>
                      <span
                        className={`text-12px font-medium  ${
                          filterDanhMuc === item?.attributes?.name
                            ? `text-[#fff]`
                            : `text-[#3B559E]`
                        }`}>
                        {item?.attributes?.name}
                      </span>
                    </button>
                  );
                })
              : "Chưa có dữ liệu"}
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <BoxTinTuc data={filteredAndLimitedArticles} />
        )}

        <div className="py-[40px] flex justify-center">
          <button
            className="py-[16px] px-[24px] bg-[#3B559E] border border-[#3B559E] text-[#fff] font-medium rounded-[50px]"
            onClick={loadMoreArticles}>
            {t("load_more_news")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
