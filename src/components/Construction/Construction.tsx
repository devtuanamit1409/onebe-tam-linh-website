import React from "react";
import Image from "next/image";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import Link from "next/link";
const searchData = {
  populate: ["bai_viets.seo.thumbnail"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

async function fetchData() {
  try {
    const data = await apiService.get(`${ENDPOINT.GET_HOME}?${searchParams}`);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
const Construction = async () => {
  const dataTinTuc = await fetchData();
  const baseUrl = process.env.URL_API;

  const baiviet = (
    dataTinTuc as {
      data: {
        attributes: {
          bai_viets: {
            data: {
              attributes: {
                title: string;
                slug: string;
                content: string;
                type: string;
                seo: {
                  title: string;
                  description: string;
                  thumbnail: {
                    data: {
                      attributes: {
                        width: number;
                        height: number;
                        url: string;
                      };
                    };
                  };
                };
              };
            }[];
          };
        };
      };
    }
  )?.data?.attributes?.bai_viets?.data;

  const construction = [
    {
      name: "Xử lý nước",
      detail: " Dự án xử lý nước thải tòa nhà văn phòng FPT 3 - quận 9",
      describe:
        "This is a short description about this card.This is a short description about this card.",
      urlImage: "/images/home/demo-du-an-1.jpg",
      width: 500,
      height: 500,
    },
    {
      name: "Xử lý nước",
      detail: " Dự án xử lý nước thải tòa nhà văn phòng FPT 3 - quận 9",
      describe:
        "This is a short description about this card.This is a short description about this card.",
      urlImage: "/images/home/demo-du-an-2.jpg",
      width: 500,
      height: 500,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-4 items-stretch">
        <div className="col-span-12 laptop:col-span-8">
          <div className="flex flex-col gap-[24px]">
            {baiviet.slice(0, 2).map((item, key) => {
              return (
                <div
                  key={key}
                  className="flex mobile:flex-col tablet:flex-row items-stretch"
                >
                  <div className="relative  mobile:pb-[84.85%]  tablet:pb-0 tablet:min-w-[268px] desktop:min-w-[312px] tablet:h-[280px]">
                    <Image
                      src={`${baseUrl}${item.attributes.seo.thumbnail.data.attributes.url}`}
                      alt="du-an"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#F4F7FF] p-[24px] w-full h-full ">
                      <div className="flex flex-col gap-[16px] laptop:max-w-[394px]">
                        <h5 className="text-[#28A645] font-bold">
                          {item.attributes.title}
                        </h5>
                        <h2 className="text-[18px] font-bold text-[#374151] leading-[28.8px]">
                          {item.attributes.seo.title}
                        </h2>
                        <p className="text-[#9CA3AF] leading-[25.6px]">
                          {item.attributes.seo.description}
                        </p>
                        <Link
                          href={item.attributes.slug}
                          className="flex items-center "
                        >
                          <span className="text-[#3B559E] font-medium mr-[10px]">
                            Đọc ngay
                          </span>
                          <Image
                            src="/images/svg-home/arrow-right.svg"
                            alt=""
                            height={20}
                            width={20}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-12 laptop:col-span-4 mobile:hidden laptop:block">
          <div className="bg-[#3B559E] h-[280px] py-[16px] px-[24px]">
            {baiviet.slice(2, 3).map((item, key) => {
              return (
                <>
                  <div className=" flex flex-col gap-[6px]">
                    <h5 className="text-[#28A645] font-bold pt-[16px]">
                      {item.attributes.seo.title}
                    </h5>
                    <h2 className="font-bold text-[18px] leading-[28.8px] text-[#fff]">
                      {item.attributes.title}
                    </h2>
                    <p className="text-[#9CA3AF] leading-[25.6px]">
                      {item.attributes.seo.description}
                    </p>
                    <Link
                      href={item.attributes.slug}
                      className="flex items-center "
                    >
                      <span className="text-[#fff] font-medium mr-[10px]">
                        Đọc ngay
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          d="M18 9.69189L11.5312 3.12939C11.25 2.84814 10.8125 2.84814 10.5312 3.12939C10.25 3.41064 10.25 3.84814 10.5312 4.12939L15.7812 9.47314H2.5C2.125 9.47314 1.8125 9.78564 1.8125 10.1606C1.8125 10.5356 2.125 10.8794 2.5 10.8794H15.8437L10.5312 16.2856C10.25 16.5669 10.25 17.0044 10.5312 17.2856C10.6562 17.4106 10.8437 17.4731 11.0312 17.4731C11.2187 17.4731 11.4062 17.4106 11.5312 17.2544L18 10.6919C18.2812 10.4106 18.2812 9.97314 18 9.69189Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
          <div className="h-[24px] w-full bg-[#3B559E] px-[24px]">
            <hr />
          </div>
          <div className="bg-[#3B559E] h-[280px] py-[16px] px-[24px]">
            {baiviet.slice(3, 4).map((item, key) => {
              return (
                <>
                  <div className=" flex flex-col gap-[6px]">
                    <h5 className="text-[#28A645] font-bold pt-[16px]">
                      {item.attributes.seo.title}
                    </h5>
                    <h2 className="font-bold text-[18px] leading-[28.8px] text-[#fff]">
                      {item.attributes.title}
                    </h2>
                    <p className="text-[#9CA3AF] leading-[25.6px]">
                      {item.attributes.seo.description}
                    </p>
                    <Link
                      href={item.attributes.slug}
                      className="flex items-center "
                    >
                      <span className="text-[#fff] font-medium mr-[10px]">
                        Đọc ngay
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          d="M18 9.69189L11.5312 3.12939C11.25 2.84814 10.8125 2.84814 10.5312 3.12939C10.25 3.41064 10.25 3.84814 10.5312 4.12939L15.7812 9.47314H2.5C2.125 9.47314 1.8125 9.78564 1.8125 10.1606C1.8125 10.5356 2.125 10.8794 2.5 10.8794H15.8437L10.5312 16.2856C10.25 16.5669 10.25 17.0044 10.5312 17.2856C10.6562 17.4106 10.8437 17.4731 11.0312 17.4731C11.2187 17.4731 11.4062 17.4106 11.5312 17.2544L18 10.6919C18.2812 10.4106 18.2812 9.97314 18 9.69189Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Construction;
