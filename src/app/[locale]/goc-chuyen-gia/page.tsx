"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import chuyen_gia_1 from "../../../../public/images/goc-chuyen-gia/Rectangle 4338.png";
import chuyen_gia_2 from "../../../../public/images/goc-chuyen-gia/Rectangle 4338 (1).png";
import chuyen_gia_3 from "../../../../public/images/goc-chuyen-gia/Rectangle 4338 (2).png";
import chuyen_gia_4 from "../../../../public/images/goc-chuyen-gia/Rectangle 4338 (3).png";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import Image from "next/image";
import IconPrevCricle from "@/components/icons/IconPrevCricle";
import IconNextCricle from "@/components/icons/IconNextCricle";
import TintucNoibat from "@/components/TintucNoibat/TintucNoibat";
import demo_goc_chuyen_gia from "../../../../public/images/goc-chuyen-gia/demo_chuuyen_gia.png";
import demo_tin_tuc_2 from "../../../../public/images/tin-tuc/demo-tin-tuc-2.jpg";
import IconWater from "@/components/icons/IconWater";
import IconDesign from "@/components/icons/IconDesign";
import IconSearch from "@/components/icons/IconSearch";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import { apiService } from "@/services/api.service";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading";
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
interface chuyengia {
  attributes: {
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
    listChuyenGia: {
      name: string;
      position: string;
      avatar: {
        data: {
          attributes: {
            url: string;
            name: string;
          };
        };
      };
    }[];
  };
}
interface danhMucBaiViet {
  id: number;
  attributes: {
    name: string;
  };
}
interface ResponseDanhMucBaiViet {
  data: danhMucBaiViet[];
}

interface ResponseDataTinTuc {
  data: tintuc[];
}
interface ResponseData {
  data: chuyengia;
}

const Page: React.FC = (params: any) => {
  const locale = params.params.locale;
  const t = useTranslations("professionalist");
  const translate = useTranslations("detail_post");
  const [tintuc, setTintuc] = useState<tintuc[]>([]);
  const [tintucWithFilter, setTintucWithFilter] = useState<tintuc[]>([]);
  const [loading, setLoading] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(3);
  const [dataChuyenGia, setDataChuyenGia] = useState<chuyengia>();
  const [dataDanhMucBaiViet, setDataDanhMucBaiViet] = useState<
    danhMucBaiViet[]
  >([]);
  const [filterDanhMuc, setFilterDanhMuc] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const searchData = {
    populate: ["danh_muc_bai_viets", "seo.thumbnail"].toString(),
  };
  const searchDataChuyenGia = {
    populate: ["seo.thumbnail", "listChuyenGia.avatar"].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const searchParamsChuyenGia = new URLSearchParams(
    searchDataChuyenGia
  ).toString();

  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchValue(searchValue), 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  useEffect(() => {
    if (debouncedSearchValue) {
    }
  }, [debouncedSearchValue]);

  const fetchDataTinTuc = async () => {
    try {
      setLoading(true);
      const endpoint = `${process.env.URL_API}/api/bai-viets?${searchParams}&locale=${locale}`;
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
      const endpoint = `${process.env.URL_API}/api/bai-viets?${searchParams}&locale=${locale}&filters[title][$containsi]=${debouncedSearchValue}&filters[type][$containsi]=Bài viết chuyên gia&pagination[pageSize]=${displayedCount}`;
      const response = await apiService.get<ResponseDataTinTuc>(endpoint);
      setTintucWithFilter(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const endpoint = `${process.env.URL_API}/api/goc-chuyen-gia?${searchParamsChuyenGia}&locale=${locale}`;
      const response = await apiService.get<ResponseData>(endpoint);
      setDataChuyenGia(response.data);
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
  const loadMoreArticles = () => {
    setDisplayedCount((prevCount) => prevCount + 3);
  };
  useEffect(() => {
    fetchDataTinTucWithFilter();
  }, [debouncedSearchValue, displayedCount]);

  useEffect(() => {
    fetchDataTinTuc();
    fetchDataDanhMucBaiViet();
    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const swiperRef = useRef<SwiperClass | null>();
  const onPrev = (): void => {
    swiperRef.current?.slidePrev();
  };

  const onNext = (): void => {
    swiperRef.current?.slideNext();
  };

  const baseUrl = process.env.URL_API;
  const text = useTranslations("home");

  const handleSetFilterDanhMuc = (name: string) => {
    if (filterDanhMuc === name) {
      setFilterDanhMuc("");
    } else {
      setFilterDanhMuc(name);
    }
  };
  console.log(tintucWithFilter);

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

  return (
    <>
      <div className="container">
        <div className="pt-[40px] pb-[32px]">
          <div className="text-center leading-10">
            <h5 className="text-[#28A645] font-bold text-[18px] laptop:block mobile:hidden ">
              {t("title")}
            </h5>
            <h1 className="text-[#111928] font-bold text-[40px] laptop:block mobile:hidden">
              {t("sub_title")}
            </h1>
            <h1 className="text-[#111928] font-bold text-[24px] laptop:hidden mobile:block">
              {t("sub_title")}
            </h1>
            <div className="laptop:flex mobile:hidden justify-center pt-5 ">
              <div className="max-w-[40%]">
                <p className="text-[#637381] leading-7">{t("description")}</p>
              </div>
            </div>
          </div>
          <div className="py-[32px]">
            <div className="laptop:flex laptop:flex-row mobile:flex-col gap-4 relative">
              <button onClick={onPrev} className="mobile:hidden laptop:block">
                <IconPrevCricle active={currentIndex === 0 ? false : true} />
              </button>
              {dataChuyenGia ? (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    744: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    920: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 10,
                    },
                  }}
                  modules={[Navigation]}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setTotalSlides(swiper.slides.length);
                  }}
                  onSlideChange={(swiper) => {
                    setCurrentIndex(swiper.realIndex);
                  }}>
                  {dataChuyenGia &&
                    dataChuyenGia.attributes?.listChuyenGia?.map(
                      (item, key) => {
                        return (
                          <SwiperSlide key={key}>
                            <div className="relative tablet:max-w-[480px] tablet:max-h-[330px] mobile:p-6  mx-auto">
                              <Image
                                src={`${baseUrl}${item.avatar?.data?.attributes?.url}`}
                                alt={item.avatar?.data?.attributes?.name}
                                width={100}
                                height={100}
                                layout="responsive"
                              />
                              <div className="px-[32px] py-[16px] bg-[#F5F3FF] text-center absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-max">
                                <h2 className="text-[#3B559E] font-semibold">
                                  {item.name}
                                </h2>
                                <span className="text-[12px] text-[#637381]">
                                  {item.position}
                                </span>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )}
                </Swiper>
              ) : (
                <div className="min-h-[330px] w-full flex justify-between items-center">
                  <Loading />
                  <Loading />
                  <Loading />
                  <Loading />
                </div>
              )}

              <button onClick={onNext} className="mobile:hidden laptop:block">
                <IconNextCricle
                  active={currentIndex === totalSlides - 1 ? false : true}
                />
              </button>
              <div className="mobile:flex laptop:hidden justify-center items-center mt-[32px]">
                <button onClick={onPrev}>
                  <IconPrevCricle active={currentIndex === 0 ? false : true} />
                </button>
                <button onClick={onNext}>
                  <IconNextCricle
                    active={currentIndex === totalSlides - 1 ? false : true}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[40px]  mobile:hidden tablet:block">
          <hr className="border border-[#ECECEC]" />
        </div>
        <h3 className="text-[35px] font-bold">{t("expertopinion")}</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="mobile:col-span-12 tablet:col-span-6 ">
            <TintucNoibat
              data={tintuc
                .filter(
                  (item: tintuc) =>
                    item.attributes.type === "Bài viết chuyên gia"
                )
                .map((item: tintuc) => item.attributes)
                .filter((item) => item?.bai_viet_tieu_diem === true)
                .map((item) => item)}
              name=""
            />
          </div>
          <div className="mobile:col-span-12 tablet:col-span-6">
            {tintuc
              .filter(
                (item: tintuc) => item.attributes.type === "Bài viết chuyên gia"
              )
              .map((item, key) => {
                return (
                  <div key={key} className="pb-[32px]">
                    <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                      <div className="tablet:col-span-6 mobile:col-span-12">
                        <div className="flex flex-col gap-[16px]">
                          <div className="w-24 h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
                            <div className="text-[#3B559E] text-base font-normal leading-normal">
                              {item?.attributes.danh_muc_bai_viets?.data[0]
                                ?.attributes?.name || "Bài viết"}
                            </div>
                          </div>
                          <h3
                            className="laptop:text-[20px] mobile:text-base text-[#374151] font-[500] line-clamp-2"
                            title={item.attributes.title}>
                            {item.attributes.title}
                          </h3>
                          <p className="laptop:text-[18px] mobile:text-[13px] text-[#8899A8] line-clamp-2">
                            {item.attributes.seo.description}
                          </p>
                          <div className="flex justify-start">
                            <button className="text-[#3B559E] px-[24px] py-[8px] rounded-[50px] btn-view">
                              {text("read_now")}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="tablet:col-span-6 mobile:col-span-12 ">
                        <div className="mobile:min-w-[196px] mobile:min-h-[196px] tablet:aspect-square laptop:max-w-[196px] tablet:min-h-[100px] tablet:min-w-[100px] relative mobile:mx-auto">
                          <Image
                            // height={196}
                            // width={196}
                            src={demo_tin_tuc_2}
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
        <div className="flex justify-between ">
          <div>
            <h2 className="text-[35px] font-bold">{t("q&a")}</h2>
          </div>
          <div className="relative">
            <input
              className="focus:outline-none laptop:p-[24px] mobile:px-[24px] mobile:py-[3px] mobile:w-full tablet:w-fit rounded-[56px] border border-[#DFE4EA] bg-[#FFFFFF] placeholder:font-[300] placeholder:italic placeholder:text-[#8899A8]"
              onChange={(e: any) => setSearchValue(e.target.value)}
              placeholder={translate("search")}
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

        <BoxTinTuc data={filteredAndLimitedArticles} />

        <div className="py-[40px] flex justify-center">
          <button
            className="py-[16px] px-[24px] bg-[#3B559E] border border-[#3B559E] text-[#fff] font-medium rounded-[50px]"
            onClick={loadMoreArticles}>
            {translate("load_more_news")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;