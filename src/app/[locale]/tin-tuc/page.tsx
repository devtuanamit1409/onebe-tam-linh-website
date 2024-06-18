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

interface danhMucBaiViet {
  id: number;
  attributes: {
    name: string;
  };
}
interface tintuc {
  id: number;
  attributes: {
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
  const [displayedCount, setDisplayedCount] = useState(3);
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

  useEffect(() => {
    if (debouncedSearchValue) {
      console.log("Searching for:", debouncedSearchValue);
    }
  }, [debouncedSearchValue]);
  const fetchDataTinTuc = async () => {
    try {
      setLoading(true);
      const endpoint = `${process.env.URL_API}/api/bai-viets?${searchParams}&locale=${locale}&filters[type][$containsi]=Tin tức `;
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
      const endpoint = `${process.env.URL_API}/api/bai-viets?${searchParams}&locale=${locale}&filters[title][$containsi]=${debouncedSearchValue}&filters[type][$containsi]=Tin tức&pagination[pageSize]=${displayedCount}`;
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

      return item.attributes.danh_muc_bai_viets?.data.some(
        (danhMuc) => danhMuc.attributes?.name === filterDanhMuc
      );
    })
    .map((item: tintuc) => item.attributes);
  const loadMoreArticles = () => {
    setDisplayedCount((prevCount) => prevCount + 3);
  };

  return (
    <>
      <div className="container py-[32px] desktop:py-[50px]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 laptop:col-span-6">
            <TintucNoibat
              data={tintuc
                .filter((item) => item?.attributes.bai_viet_tieu_diem === true)
                .map((item) => item.attributes)}
              name="Bài viết nổi bật"
            />
          </div>
          <div className="col-span-12 laptop:col-span-6">
            <h2 className="text-[24px] font-bold text-[#374151]">
              Tin mới lên
            </h2>
            {tintuc &&
              tintuc.map((item) => {
                return (
                  <div key={item.id} className="py-[16px]">
                    <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                      <div className="col-span-7">
                        <div className="flex flex-col gap-[16px]">
                          <div className="w-24 h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
                            <div className="text-indigo-800 text-base font-normal leading-normal">
                              Mới đây
                            </div>
                          </div>
                          <h3 className="text-[20px] text-[#374151] font-[500]">
                            {item.attributes.seo.description}
                          </h3>
                          <p className="text-[18px] text-[#8899A8]">
                            {item.attributes.seo.description}
                          </p>
                          <div className="flex justify-start">
                            <Link
                              href={`/${item.attributes.slug}`}
                              className="text-[#3B559E] px-[24px] py-[8px] rounded-[50px] btn-view">
                              Đọc ngay
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-5">
                        <div className="">
                          <Image
                            height={196}
                            width={196}
                            src={`${baseUrl}${item.attributes.seo.thumbnail.data.attributes.url}`}
                            layout="responsive"
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

        <div className="flex justify-between ">
          <div>
            <h2 className="text-[35px] font-bold">Tất cả bài viết</h2>
          </div>
          <div className="relative">
            <input
              className="focus:outline-none p-[24px] rounded-[56px] border border-[#DFE4EA] bg-[#FFFFFF] placeholder:font-[300] placeholder:italic placeholder:text-[#8899A8]"
              onChange={(e: any) => setSearchValue(e.target.value)}
              placeholder="Nhập từ khóa tìm kiếm"
            />
            <button className="w-[56px] h-[56px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[2%] top-[10%]">
              <IconSearch />
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
                        handleSetFilterDanhMuc(item.attributes.name)
                      }
                      className={`${
                        filterDanhMuc === item.attributes.name
                          ? `bg-[#3B559E] border-[#3B559E]`
                          : `bg-[#fff] border  border-[#3B559E]`
                      } py-[8px] px-[10px] flex items-center rounded-[24px] border`}>
                      <span
                        className={`text-12px font-medium  ${
                          filterDanhMuc === item.attributes.name
                            ? `text-[#fff]`
                            : `text-[#3B559E]`
                        }`}>
                        {item.attributes.name}
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
            Tải thêm bài viết
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
