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
import { ENDPOINT } from "@/enums/endpoint.enum";

interface ResponseData {
  data: {
    id: number;
    attributes: {
      name: string;
      slug: string;
      description: string;
    };
  }[];
}

const Header: React.FC = () => {
  const [dataHeader, setDataHeader] = useState<ResponseData["data"]>([]);
  const searchData = {
    populate: ["danh_muc_cons.bai_viets", "bai_viets.seo"].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const fetchData = async () => {
    try {
      const endpoint = `${process.env.URL_API}/api/danh-mucs?${searchParams}`;
      const response = await apiService.get<ResponseData>(endpoint);
      setDataHeader(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = useMemo(
    () => [
      {
        key: "san-pham",
        label: <div className="flex items-center gap-3">Sản phẩm </div>,
        showIcon: true,
      },
      {
        key: "dich-vu",
        label: <div className="flex items-center gap-3">Dịch vụ </div>,
        showIcon: true,
      },
      {
        key: "du-an",
        label: <div className="flex items-center gap-3">Dự án</div>,
        showIcon: true,
      },
      {
        key: "doi-tac",
        label: (
          <Link href="/doi-tac" className="flex items-center gap-3">
            Đối tác
          </Link>
        ),
        showIcon: false,
      },
      {
        key: "ve-chung-toi",
        label: <div className="flex items-center gap-3">Về chúng tôi </div>,
        showIcon: true,
      },
      {
        key: "tin-tuc",
        label: (
          <Link href="/tin-tuc" className="flex items-center gap-3">
            Tin tức
          </Link>
        ),
        showIcon: false,
      },
      {
        key: "thong-tu-nghi-dinh",
        label: (
          <div className="flex items-center gap-3">Thông tư - Nghị định </div>
        ),
        showIcon: true,
      },
    ],
    []
  );

  // get pathname to active navigation
  useEffect(() => {
    console.log("pathname to active navigation", pathname);
    setActiveKey(pathname);
  }, [pathname]);

  const handleToggleMegaMenu = (key: string, condition: boolean) => {
    if (!condition) {
      return;
    }

    if (isMenuOpen) {
      if (activeKey === key) {
        setActiveKey(null);
        setIsMenuOpen(false);
      } else {
        setActiveKey(key);
      }
    } else {
      setIsMenuOpen(true);
      setActiveKey(key);
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

  // mobileMenu
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className=" flex desktop:h-[100px] mobile:h-[72px] border-spacing-0 bg-white z-50 fixed top-0 left-0 w-screen  mobile:shadow desktop:shadow-none">
      <div className="container">
        <div className="hidden desktop:flex w-full max-w-full h-auto p-0 px-4  my-[30px] mx-auto justify-between">
          <div className="flex w-full">
            <Link href="/">
              <Image src={NTSLogo.src} alt="NTS Logo" width={80} height={40} />
            </Link>
            <ul className="hidden desktop:flex bg-transparent w-full  justify-between mx-8">
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  className={`border-b-2 border-transparent flex items-center
                 `}>
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      handleToggleMegaMenu(item.key, item.showIcon);
                    }}
                    className={`font-inter text-base font-medium leading-6 text-left  flex items-center gap-3 cursor-pointer 
                  ${
                    activeKey === item.key ? "text-[#28A645]" : "text-[#3B559E]"
                  }
                  `}>
                    {item.label}
                    {item.showIcon &&
                      (activeKey === item.key ? (
                        <IconAngleUp />
                      ) : (
                        <IconAngleDown />
                      ))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="hidden desktop:flex">
              <LanguageSwitch />
            </div>
          </div>
        </div>
        <div className=" mobile:flex desktop:hidden w-full h-[72px] px-[15px] py-4 bg-white justify-between items-center inline-flex">
          <Link href="/">
            <Image src={NTSLogo.src} alt="NTS Logo" width={60} height={40} />
          </Link>
          <div className=" w-8 h-8 px-[0.85px] py-[6.30px] justify-center items-center ">
            <button
              className="w-[30.30px] h-[19.40px] relative"
              onClick={toggleMenu}>
              <IconMenu />
            </button>
            <MobileMenu
              data={dataHeader ? dataHeader : []}
              isOpen={isOpen}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>
        <MegaMenu
          data={dataHeader ? dataHeader : []}
          activeKey={activeKey}
          isMenuOpen={isMenuOpen}
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
