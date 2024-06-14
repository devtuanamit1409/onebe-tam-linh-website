import IconAngleRightColorFull from "@/components/icons/IconAngleRightColorFull";
import bannerDichVu from "../../../../public/images/banner/banner-dich-vu.png";
import Image from "next/image";
import Link from "next/link";

import PageMenu from "@/components/PageMenu";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";

const searchData = {
  populate: ["seo.thumbnail", "danh_muc_bai_viets "].toString(),
};
const searchDataDanhMuc = {
  populate: ["bai_viets.seo", "danh_muc_cons.bai_viets.seo "].toString(),
};
const searhDichVu = {
  populate: ["main.seo.thumbnail"].toString(),
};
const searchParamsDichVu = new URLSearchParams(searhDichVu).toString();
const searchParamsSanPham = new URLSearchParams(searchDataDanhMuc).toString();
const searchParams = new URLSearchParams(searchData).toString();

// export async function generateMetadata(): Promise<Metadata> {
//   const dataBaiViet = await fetchData();
//   const seo =
//     (dataBaiViet as { data: { attributes: { seo: any } } })?.data?.attributes
//       ?.seo || {};

//   const baseUrl = process.env.URL_API;

//   return {
//     metadataBase: new URL(baseUrl || ""),
//     title: seo.title || "Tin tức - Công ty TNHH Kỹ thuật NTS",
//     description:
//       seo.description ||
//       "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
//     keywords:
//       seo.keywords ||
//       "kỹ thuật, công trình, tư vấn cơ điện, xử lý nước, tái sử dụng nước",
//     authors: [{ name: seo.author || "Công ty TNHH Kỹ thuật NTS" }],
//     openGraph: {
//       title:
//         seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
//       description:
//         seo.ogDescription ||
//         seo.description ||
//         "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
//       url: `${baseUrl}/tin-tuc`,
//       images: [
//         {
//           url: seo.thumbnail?.data?.attributes?.url
//             ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
//             : "/path/to/default-image.jpg",
//           width: 800,
//           height: 600,
//           alt: "Image description",
//         },
//       ],
//     },
//     twitter: {
//       title:
//         seo.twitterTitle || seo.title || "Tin tức - Công ty TNHH Kỹ thuật NTS",
//       description:
//         seo.twitterDescription ||
//         seo.description ||
//         "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
//       images: [
//         seo.twitterImage
//           ? `${baseUrl}${seo.twitterImage}`
//           : "/path/to/default-image.jpg",
//       ],
//       card: "summary_large_image",
//     },
//   };
// }
// async function fetchDataDanhMuc() {
//   try {
//     const data = await apiService.get(
//       `${ENDPOINT.GET_DANHMUC}?${searchParamsSanPham}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }
async function fetchData(endpoint: any) {
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

  const dataTinTuc = await fetchData(
    `${ENDPOINT.GET_BAIVIET}?${searchParams}&locale=${locale}`
  );
  const dataDichVu = await fetchData(
    `${ENDPOINT.GET_DICHVU}?${searchParamsDichVu}&locale=${locale}`
  );
  const dichVu = (
    dataDichVu as {
      data: {
        attributes: {
          main: {
            name: string;
            description: string;
          };
        };
      };
    }
  )?.data?.attributes?.main;
  const baseUrl = process.env.URL_API;
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
  const tintuc = baiViet.data
    .filter((item) => item?.attributes?.type === "Tin tức")
    .map((item) => item.attributes);

  const dataDanhMuc = await fetchData(
    `${ENDPOINT.GET_DANHMUC}?${searchParamsSanPham}&locale=${locale}`
  );
  const danhMuc = (
    dataDanhMuc as {
      data: {
        attributes: {
          name: string;
          slug: string;
          description: string;
          danh_muc_cons: {
            data: {
              attributes: {
                name: string;
                slug: string;
                description: string;
                bai_viets: {
                  data: {
                    attributes: {
                      title: string;
                      slug: string;
                      content: string;
                      type: string;
                      bai_viet_tieu_diem: boolean;
                      seo: {
                        title: string;
                        description: string;
                        keyword: string;
                      };
                    };
                  }[];
                };
              };
            }[];
          };

          bai_viets: {
            data: {
              attributes: {
                title: string;
                slug: string;
                content: string;
                type: string;
                bai_viet_tieu_diem: boolean;
                seo: {
                  title: string;
                  description: string;
                  keyword: string;
                };
              };
            }[];
          };
        };
      }[];
    }
  )?.data;

  const dichVuMenu = danhMuc.filter(
    (item) => item.attributes.slug === "dich-vu"
  );

  const menuItem = [
    {
      title: "",
      url: "/",
      children: [
        {
          title: "Tư vấn kỹ thuật nước",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có",
          children: [],
        },
        {
          title: "Tư vấn giải pháp tái sử dụng nước",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Thi công, chuyển giao công nghệ",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Bảo hành, bảo trì chuyên nghiệp",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Đào tạo nghề ngành nước",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
    },
    // {
    //   title: "Câu hỏi thường gặp",
    //   url: "/",
    //   children: [
    //     {
    //       title: "Thiết kế cơ điện ( Thiết kế M&E ) là gì?",
    //       url: "/",
    //       icon: <IconAngleRightColorFull />,
    //       descriptions:
    //         "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

    //       children: [],
    //     },
    //     {
    //       title: "Hệ thống cơ điện có vai trò như thế nào trong công trình?",
    //       url: "/",
    //       icon: <IconAngleRightColorFull />,
    //       descriptions:
    //         "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

    //       children: [],
    //     },
    //     {
    //       title: "Thiết kế cơ điện có khó không?",
    //       url: "/",
    //       icon: <IconAngleRightColorFull />,
    //       descriptions:
    //         "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

    //       children: [],
    //     },
    //     {
    //       title:
    //         "Một đội thiết kế ME chuyên nghiệp cần tối thiểu bao nhiêu người?",
    //       url: "/",
    //       icon: <IconAngleRightColorFull />,
    //       descriptions:
    //         "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

    //       children: [],
    //     },
    //     {
    //       title: "Đơn giá thiết kế ME tính như thế nào?",
    //       url: "/",
    //       icon: <IconAngleRightColorFull />,
    //       descriptions:
    //         "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

    //       children: [],
    //     },
    //     {
    //       title: "Kỹ sư xây dựng hay kiến trúc sư có thể thiết kế ME không?",
    //       url: "/",
    //       icon: <IconAngleRightColorFull />,
    //       descriptions:
    //         "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

    //       children: [],
    //     },
    //     {
    //       title:
    //         "Sự khác nhau giữa thiết kế M&E và thiết kế hạ tầng kỹ thuật điện nước?",
    //       url: "/",
    //       icon: <IconAngleRightColorFull />,
    //       descriptions:
    //         "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

    //       children: [],
    //     },
    //     {
    //       title: "Công ty NTS áp dụng tiêu chuẩn nào cho các hồ sơ thiết kế?",
    //       url: "/",
    //       icon: <IconAngleRightColorFull />,
    //       descriptions:
    //         "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

    //       children: [],
    //     },
    //   ],
    // },
  ];
  const data_tin_tuc = [
    {
      url: "/images/tin-tuc/tin-tuc-1.jpg",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-2.jpg",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-3.jpg",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-1.jpg",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-2.jpg",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-3.jpg",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];
  return (
    <div>
      <div className="relative w-full h-[18.5%] desktop:min-h-[682px] laptop:min-h-[455px] tablet:min-h-[400px] mobile:min-h-[200px] overflow-hidden">
        <Image
          src={bannerDichVu}
          alt="banner"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="container">
        <div className=" flex-col justify-start items-center gap-6 flex mt-[40px]">
          <h2 className="text-black text-[54px] font-bold  capitalize leading-normal">
            {dichVu?.name || "Chưa ráp CMS"}
          </h2>
          <p className="text-gray-500 text-xl font-medium  leading-normal">
            {dichVu?.description || "Chưa ráp CMS"}
          </p>
        </div>
        <PageMenu menu={dichVuMenu[0]} locale={locale} />
      </div>
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
      <div className="container">
        <ContactEnd />
      </div>
    </div>
  );
};
export default page;
