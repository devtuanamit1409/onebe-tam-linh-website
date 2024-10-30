"use client";

import React, { useState, useEffect } from "react";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEndClient from "@/components/ContactEndClient/ContactEndClient";
import { Pagination } from "antd";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface DetailDanhMucProps {
  detailSubCategory: {
    category: string;
    name: string;
    description: string;
    content: string;
  } | null;
  filteredData: Array<{
    id: number;
    title: string;
    slug: string;
    locale: string;
    subTitle: string;
    seo: any;
    createdAt: string;
  }>;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  loading: boolean;
  locale: string;
}

const DetailDanhMuc: React.FC<DetailDanhMucProps> = ({
  detailSubCategory,
  filteredData: initialFilteredData,
  pagination: initialPagination,
  locale,
  loading,
}) => {
  const translate = useTranslations("404");
  const [filteredData, setFilteredData] = useState(initialFilteredData);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(loading);

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/fetchFilteredData?page=${page}&pageSize=${pagination.pageSize}&locale=${locale}`
      );
      const result = await response.json();
      setFilteredData(result.data);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: result.total,
      }));
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {detailSubCategory && (
        <div className="desktop:pt-[80px] pt-[32px] pb-[64px] container">
          <div className="flex flex-col gap-[24px] desktop:gap-[40px]">
            <h3 className="text-[#28A645] text-[18px] desktop:text-[20px] font-medium text-center uppercase">
              {detailSubCategory?.category || ""}
            </h3>
            <h1 className="text-[24px] laptop:text-[54px] tablet:text-[40px] mobile:text-[32px] font-bold text-center">
              {detailSubCategory?.name || ""}
            </h1>
            <p className="text-[#8899A8] text-center">
              {detailSubCategory?.description || ""}
            </p>
            <div
              className="blog-content desktop:py-[40px] desktop:px-[120px] mobile:px-0 mobile:pb-[20px]"
              dangerouslySetInnerHTML={{
                __html: detailSubCategory?.content || "",
              }}
            />
          </div>
        </div>
      )}

      {filteredData.length > 0 ? (
        <>
          <div className="container">
            <BoxTinTuc data={filteredData} locale={locale} />
          </div>
          <div className="py-[40px] container flex justify-center">
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange}
            />
          </div>
          <div className="container">
            <ContactEndClient />
          </div>
        </>
      ) : isLoading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex h-[500px] bg-[#3B559E] mb-[80px]">
            <div className="w-full h-full flex flex-col justify-center items-center gap-[35px]">
              <p className="text-center text-[#fff] text-[48px] font-bold leading-[130px]">
                {translate("no_article")}
              </p>
              <Link
                href="/"
                className="min-w-[187px] h-12 px-6 py-3 rounded-md border border-white justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal">
                {translate("back_home")}
              </Link>
            </div>
          </div>
          <div className="container">
            <ContactEndClient />
          </div>
        </>
      )}
    </>
  );
};

export default DetailDanhMuc;
