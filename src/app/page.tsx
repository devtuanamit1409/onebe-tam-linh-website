"use server";
import Head from "next/head";
import SlideHome from "@/components/Slidehome/SlideHome";
import SliderKhachHang from "@/components/SlideKhachHang/SliderKhachHang";
import "../styles/pages/home.css";
import Image from "next/image";
import SlideMember from "@/components/SlideMember/SlideMember";
import Construction from "@/components/Construction/Construction";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import imageBannerVeChungToi1 from "../../public/images/bannerHome/banner-ve-chung-toi-1.jpg";
import imageBannerVeChungToi2 from "../../public/images/bannerHome/banner-ve-chung-toi-2.jpg";
import imageBannerVeChungToi3 from "../../public/images/bannerHome/banner-ve-chung-toi-3.jpg";
import bannerMember from "../../public/images/bannerHome/banner-member.png";
import Link from "next/link";
import AboutUsSlider from "@/components/AboutUsSlider";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";
import type { Metadata } from "next";

const searchData = {
  populate: ["seo.thumbnail", "banner.urlImage"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

console.log(searchParams);

async function fetchData() {
  try {
    const data = await apiService.get(`${ENDPOINT.GET_HOME}?${searchParams}`);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function generateMetadata(): Promise<Metadata> {
  const dataHome = await fetchData();
  const seo =
    (dataHome as { data: { attributes: { seo: any } } })?.data?.attributes
      ?.seo || {};

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
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.ogDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      url: `${baseUrl}/home`,
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
  };
}
interface HomeProps {
  banner: any;
}

const Home: React.FC<HomeProps> = async () => {
  const dataHome = await fetchData();

  const banner = (dataHome as { data: { attributes: { banner: any } } })?.data
    ?.attributes?.banner;
  return (
    <main>
      <SlideHome banner={banner} />
      <div className="flex justify-center  ">
        <div className="container">
          <div className="laptop:pb-[80px] mobile:pb-[72px] laptop:pt-[48px] mobile:pt-[40px] ">
            <SliderKhachHang />
          </div>
        </div>
      </div>
      <div className="section-gioi-thieu py-6">
        <div>
          <div className="flex justify-center">
            <div className="container z-40">
              <div className="grid laptop:grid-cols-2 mobile:grid-cols-1 laptop:gap-[45px] mobile:gap-[72px]">
                <div className="col-span-1 grid grid-cols-2 gap-[25px]">
                  <div className="relative h-full   desktop:max-h-[400px] laptop:max-h-[320px] tablet:max-h-[390px] mobile:max-h-[200px] rounded-2xl overflow-hidden -translate-y-[-50%]">
                    <Image
                      src={imageBannerVeChungToi1.src}
                      alt="Image 1"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center gap-[25px]">
                    <div className="flex-1 relative   desktop:min-h-[400px] laptop:min-h-[320px] tablet:min-h-[390px] mobile:min-h-[200px] rounded-2xl overflow-hidden">
                      <Image
                        src={imageBannerVeChungToi2.src}
                        alt="Image 1"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1 relative   desktop:min-h-[400px] laptop:min-h-[320px] tablet:min-h-[390px] mobile:min-h-[200px] rounded-2xl overflow-hidden">
                      <Image
                        src={imageBannerVeChungToi3.src}
                        alt="Image 1"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-1 flex items-center">
                  <div className="gap-6">
                    <h4 className="text-indigo-800 desktop:text-5xl mobile:text-[28px] tablet:text-[40px] font-semibold capitalize leading-[76.80px mobile:text-center">
                      Giới thiệu về chúng tôi
                    </h4>
                    <div className=" text-gray-900 desktop:text-2xl mobile:text-base tablet:text-[20px] font-medium leading-[38.40px] laptop:my-6 mobile:my-8 mobile:text-center">
                      Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định
                      hướng trở thành nhà cung cấp hàng đầu cho các giải pháp kỹ
                      thuật công trình. Theo đó những lĩnh vực chính mà NTS theo
                      đuổi một cách tâm huyết ngay từ những ngày đầu là: Tư vấn
                      cơ điện, Xử lý nước, Tái sử dụng nước; Cung cấp thiết bị
                      sân vườn, thiết bị tưới cây; Thiết bị thu hồi nước mưa và
                      các tiện ích khác…
                    </div>
                    <div className="inline-flex justify-center w-full">
                      <Link
                        href="/ve-chung-toi"
                        className="bg-[#3B559E] text-[#fff] py-[12px] px-[24px] rounded-[50px] border border-[#3B559E] hover:bg-[#fff] hover:text-[#3B559E]"
                      >
                        Về chúng tôi
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <AboutUsSlider />
            </div>
          </div>
        </div>
        <div className="h-[0px] laptop:h-[110px]"></div>
      </div>
      <div className="section-member tablet:my-[120px] mobile:my-[32px] relative">
        <Image
          src={bannerMember.src}
          alt="banner"
          layout="fill"
          objectFit="cover"
        />
        <div className="flex justify-center">
          <div className="container">
            <div className="grid grid-cols-12 gap-6 pt-[5%]">
              <div className="col-span-12 ">
                <div className="flex justify-center">
                  <div>
                    <h2 className="font-bold laptop:text-[48px] tablet:text-[40px] mobile:text-[28px] text-center">
                      Các Công Ty Thành Viên
                    </h2>
                    <p className="pt-[24px] text-[18px] max-w-[572px] font-medium text-center">
                      Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định
                      hướng trở thành nhà cung cấp hàng đầu cho các giải pháp kỹ
                      thuật công trình. Tất cả đều hướng đến trọng tâm là phục
                      vụ tiện ích cho cuộc sống một cách bền vững và lâu dài.
                    </p>
                    <div className="pt-[24px] flex justify-center">
                      <Link
                        href={"/"}
                        className="py-[12px] px-[24px] bg-[#28A645] text-[white] rounded-[50px] border border-[#28A645] hover:bg-[#fff] hover:text-[#28A645] "
                      >
                        Xem thêm
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12  relativ flex justify-center">
                <div className="h-[417px] w-[356px] card-member relative z-40">
                  <SlideMember />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[80px]">
        <div className="flex justify-center">
          <div className="laptop:w-[1038px]">
            <div className="text-center">
              <h3 className="text-[#28A645] text-[20px] font-bold">DỰ ÁN</h3>
              <h2 className="text-[#111928] text-[40px] font-bold py-[16px]">
                Công Trình Đã Thực Hiện
              </h2>
              <div className="flex justify-center">
                <p className="text-[#637381] text-[20px] laptop:w-[572px]">
                  This is a short description about this content.This is a short
                  description about this content.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="container">
            <div className="pt-[40px]">
              <Construction />
            </div>

            <ContactEnd />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
