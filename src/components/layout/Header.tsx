"use client";
import Image from "next/image";
import NTSLogo from "../../../public/images/logo/logo.png";
import IconAngleDown from "../icons/IconAngleDown";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconAngleUp from "../icons/IconAngleUp";
import LanguageSwitch from "../LanguageSwitch";
import { GetServerSideProps } from "next";
import IconMenu from "../icons/IconMenu";
import MobileMenu from "../MobileMenu";
import MegaMenu from "../MegaMenu";
import { apiService } from "@/services/api.service";
import { useTranslations } from "next-intl";
import MobileMenuNew from "../MobileMenuNew";

interface ResponseData {
  data: {
    id: number;
    attributes: {
      name: string;
      slug: string;
      description: string;
      main: any;
    };
  }[];
}
interface ResponseDataDanhMuc {
  data: {
    id: number;
    attributes: {
      main: {
        name: string;
        description: string;
      };
    };
  }[];
}

const Header = (locale: any) => {
  const t = useTranslations("menu");
  const [dataHeader, setDataHeader] = useState<ResponseData["data"]>([]);

  const [dataVeChungToi, setDataVeChungToi] = useState<any>([]);
  const [dataDanhMuc, setDataDanhMuc] = useState<ResponseDataDanhMuc["data"]>();

  const [loading, setLoading] = useState(false);
  const searchData = {
    populate: ["main"].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchData = async () => {
    try {
      const endpoint = `${process.env.URL_API}/api/danh-muc-cons?filters[category][$eqi]=${activeKey}&locale=${locale.locale}`;
      const response = await apiService.get<ResponseData>(endpoint);
      setDataHeader(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataActiveKey = async (danhmuc: string | null) => {
    try {
      const endpoint = `${process.env.URL_API}/api/${danhmuc}?${searchParams}&locale=${locale.locale}`;
      const response = await apiService.get<ResponseDataDanhMuc>(endpoint);
      setDataDanhMuc(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataVeChungToi = async () => {
    const listEndPoint = [
      `${process.env.URL_API}/api/ve-chung-toi?populate=main&locale=${locale.locale}`,
      `${process.env.URL_API}/api/goc-chuyen-gia?locale=${locale.locale}`,
      `${process.env.URL_API}/api/cong-ty-thanh-vien?locale=${locale.locale}`,
      locale.locale === "en"
        ? `${process.env.URL_API}/api/danh-muc-cons?locale=en&filters[category][$eqi]=Dự án&filters[name][$eqi]=Community Project`
        : `${process.env.URL_API}/api/danh-muc-cons?filters[category]=Dự án&filters[name][$eqi]=Dự án cộng đồng`,
    ];
    try {
      const responses = await Promise.all(
        listEndPoint.map((endpoint) => apiService.get<any>(endpoint))
      );
      const allData = responses;
      setDataVeChungToi(() => {
        return [
          {
            id: 1,
            name: allData[0].data.attributes.main.name,
            description: allData[0].data.attributes.main.description,
            url: "ve-chung-toi",
          },
          {
            id: 2,
            name: "Góc chuyên gia",
            description: allData[1].data.attributes.description,
            url: "goc-chuyen-gia",
          },
          {
            id: 3,
            name: "Công ty thành viên",
            description: allData[2].data.attributes.description,
            url: "cong-ty-thanh-vien",
          },
          {
            id: 4,
            name: allData[3].data[0].attributes.name,
            description: allData[3].data[0].attributes.description,
            url: allData[3].data[0].attributes.slug,
          },
        ];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const menuItems = useMemo(
    () => [
      {
        key: "Sản phẩm",
        label: <div className="flex items-center gap-3">{t("products")}</div>,
        showIcon: true,
      },
      {
        key: "Dịch vụ",
        label: <div className="flex items-center gap-3">{t("services")}</div>,
        showIcon: true,
      },
      {
        key: "Dự án",
        label: <div className="flex items-center gap-3">{t("projects")}</div>,
        showIcon: true,
      },
      {
        key: "Đối tác",
        label: (
          <Link href="/doi-tac" className="flex items-center gap-3">
            {t("partners")}
          </Link>
        ),
        showIcon: false,
      },
      {
        key: "Về chúng tôi",
        label: <div className="flex items-center gap-3">{t("about_us")}</div>,
        showIcon: true,
      },
      {
        key: "Tin tức",
        label: (
          <Link href="/tin-tuc" className="flex items-center gap-3">
            {t("newsTitle")}
          </Link>
        ),
        showIcon: false,
      },
      {
        key: "Thông tư nghị định",
        label: (
          <div className="flex items-center gap-3">{t("circular_decree")}</div>
        ),
        showIcon: true,
      },
    ],
    []
  );

  // get pathname to active navigation
  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);

  const handleMouseEnter = (key: string, condition: boolean) => {
    if (condition) {
      if (key === "Về chúng tôi") {
        fetchDataVeChungToi();
        setActiveKey(key);
        setIsMenuOpen(true);
      } else {
        setActiveKey(key);
        setIsMenuOpen(true);
        fetchDataActiveKey(key);
      }
    }
  };
  const handleGetEndPoint = (key: string) => {
    switch (key) {
      case "Sản phẩm":
        return "san-pham";
      case "Dịch vụ":
        return "dich-vu";
      case "Dự án":
        return "du-an";
      case "Đối tác":
        return null;
      case "Về chúng tôi":
        return "ve-chung-toi";
      case "Tin tức":
        return null;
      case "Thông tư nghị định":
        return "thong-tu-nghi-dinh";
      default:
        return null;
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (
      relatedTarget &&
      relatedTarget instanceof HTMLElement &&
      !relatedTarget.closest(".mega-menu-container")
    ) {
      setActiveKey(null);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const foundItem = menuItems.find((item) =>
      pathname.startsWith(`/${item.key}`)
    );
    setActiveKey(foundItem ? foundItem.key : null);
    setIsMenuOpen(false);
    setIsOpen(false);
  }, [pathname, menuItems]);
  useEffect(() => {
    setLoading(true);
    if (activeKey) {
      fetchData();
      fetchDataActiveKey(handleGetEndPoint(activeKey));
    }
    setLoading(false);
  }, [activeKey]);

  // mobileMenu
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex laptop:h-[100px] mobile:h-[72px] border-spacing-0 bg-white z-50 fixed top-0 left-0 w-screen mobile:shadow ">
      <div className="container">
        <div className="hidden laptop:flex w-full max-w-full  p-0 px-4 h-[100px] mx-auto justify-between">
          <div className="flex w-full">
            <Link href={`/${locale.locale}`} className="my-auto">
              <Image src={NTSLogo.src} alt="NTS Logo" width={80} height={40} />
            </Link>
            <ul className="hidden laptop:flex bg-transparent w-full justify-between mx-8">
              {menuItems.map((item) => {
                const isActive = pathname.replace("/", "") === item.key;
                return (
                  <li
                    key={item.key}
                    className={`border-b-2 border-transparent flex items-center`}
                    onMouseEnter={() => {
                      handleMouseEnter(item.key, item.showIcon);
                    }}
                    onMouseLeave={handleMouseLeave}>
                    <div
                      className={`font-inter text-base font-medium leading-6 hover:text-[#28A645] ${
                        isActive ? "text-[#28A645]" : "text-[#3B559E]"
                      } text-left flex items-center gap-3 cursor-pointer 
                    ${activeKey === item.key ? "text-[#28A645]" : ""}`}>
                      {item.label}
                      {item.showIcon &&
                        (activeKey === item.key ? (
                          <IconAngleUp width="12" height="12" />
                        ) : (
                          <IconAngleDown width="12" height="12" />
                        ))}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="hidden laptop:flex">
              <LanguageSwitch />
            </div>
          </div>
        </div>
        <div className="mobile:flex laptop:hidden w-full h-[72px] px-[15px] py-4 bg-white justify-between items-center inline-flex">
          <Link href={`/${locale.locale}`}>
            <Image src={NTSLogo.src} alt="NTS Logo" width={60} height={40} />
          </Link>
          <div className="w-8 h-8 px-[0.85px] py-[6.30px] justify-center items-center">
            <button
              className="w-[30.30px] h-[19.40px] relative"
              onClick={toggleMenu}>
              <IconMenu />
            </button>

            <MobileMenuNew
              locale={locale.locale}
              isOpen={isOpen}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>

        <MegaMenu
          locale={locale.locale}
          data={dataHeader ? dataHeader : []}
          dataDanhMuc={dataDanhMuc ? dataDanhMuc : null}
          activeKey={activeKey}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleMouseLeave={handleMouseLeave}
          loading={loading}
          dataVeChungToi={dataVeChungToi}
        />
      </div>
    </header>
  );
};

export default Header;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      locale: locale || "vi", // Kiểu của locale là string | undefined
    },
  };
};
