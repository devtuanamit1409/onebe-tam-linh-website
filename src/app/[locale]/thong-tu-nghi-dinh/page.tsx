import Image from "next/image";
import demo_thong_tu_nghi_quyet from "../../../public/images/thong-tu-nghi-quyet/demo-thong-tu-nghi-quyet.png";
import IconArrowRight from "@/components/icons/IconArrowRight";
import Link from "next/link";
import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconAngleRightColorFull from "@/components/icons/IconAngleRightColorFull";
import PageMenu from "@/components/PageMenu";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { Metadata } from "next";

const searchData = {
  populate: ["seo.thumbnail", "danh_muc_bai_viets "].toString(),
};
const searchDataDanhMuc = {
  populate: ["bai_viets.seo", "danh_muc_cons.bai_viets.seo "].toString(),
};

const searchParamsSanPham = new URLSearchParams(searchDataDanhMuc).toString();
const searchParams = new URLSearchParams(searchData).toString();

export async function generateMetadata(): Promise<Metadata> {
  const dataBaiViet = await fetchData();
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
async function fetchDataDanhMuc() {
  try {
    const data = await apiService.get(
      `${ENDPOINT.GET_DANHMUC}?${searchParamsSanPham}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
async function fetchData() {
  try {
    const data = await apiService.get(
      `${ENDPOINT.GET_BAIVIET}?${searchParams}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const page = async () => {
  const dataTinTuc = await fetchData();
  const dataDanhMuc = await fetchDataDanhMuc();
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

  const thongTuNghiDinh = danhMuc.filter(
    (item) => item.attributes.slug === "thong-tu-nghi-dinh"
  );

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
  ];
  const menuItem = [
    {
      title: "xử lý nước Cấp",
      url: "/",
      children: [
        {
          title: "Hệ thống lọc tổng",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có",
          children: [],
        },
        {
          title: "Xử lý nước cấp sinh hoạt",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
    },
    {
      title: "Tái sử dụng nước",
      url: "/",
      children: [
        {
          title: "Thu gom và sử dụng nước mưa",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Tái sử dụng nước thải",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
    },
    {
      title: "xử lý nước Thải",
      url: "/",
      children: [
        {
          title: "Xử lý nước thải bệnh viện",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Xử lý nước thải khu dân cư",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Xử lý nước thải toà nhà văn phòng",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
        {
          title: "Xử lý nước thải trường học",
          url: "/",
          icon: <IconAngleRightColorFull />,
          descriptions:
            "Tình trạng ô nhiễm nước ở các đô thị, nước thải, rác thải sinh hoạt không có hệ thống xử lý tập trung mà trực tiếp xả ra nguồn tiếp nhận (sông, hồ, kênh, mương). Mặt khác, còn rất nhiều cơ sở sản xuất không xử lý nước thải, phần lớn các bệnh viện và cơ sở y tế lớn chưa có ",

          children: [],
        },
      ],
    },
  ];
  return (
    <>
      <div className="relative w-full h-[18.5%] min-h-[682px]">
        <Image
          src={demo_thong_tu_nghi_quyet}
          alt="banner"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="container">
        <div className=" flex-col justify-center items-center gap-6 flex mt-[40px]">
          <h2 className="text-black text-[54px] font-bold  capitalize leading-0">
            Thông tư - Nghị Định
          </h2>
          <p className="text-gray-500 text-xl font-medium  leading-normal">
            This is a short discription about this content
          </p>
        </div>
        <PageMenu menu={thongTuNghiDinh[0] || []} />
      </div>
      <div className="bg-[#F3F6FE] py-[80px]">
        <div className="container">
          <div className="flex justify-between  pb-[40px]">
            <h2 className="font-bold text-[32px]">Tin tức</h2>
            <Link href="/tin-tuc" className="flex items-center">
              <p className="font-medium mr-[8px] text-[#3B559E]">
                Tới trang tin tức
              </p>
              <IconArrowRight width={20} height={20} />
            </Link>
          </div>
          <BoxTinTuc data={tintuc} />
        </div>
      </div>
      <div className="container">
        <ContactEnd />
      </div>
    </>
  );
};

export default page;
