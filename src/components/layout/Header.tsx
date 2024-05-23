"use client";
import Image from "next/image";
import NTSLogo from "../../../public/images/logo/logo.png";
import IconAngleDown from "../icons/IconAngleDown";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Dropdown, Menu } from "antd";
import { usePathname } from "next/navigation";
import IconAngleUp from "../icons/IconAngleUp";
import IconGlobe from "../icons/IconGlobe";
import LanguageSwitch from "../LanguageSwitch";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import { GetServerSideProps } from "next";
import IconMenu from "../icons/IconMenu";

import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
  // const { t } = useTranslation();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(pathname);
  const menuItems = useMemo(
    () => [
      {
        key: "xu-ly-nuoc",
        label: <div className="flex items-center gap-3">Xử lý nước </div>,
        showIcon: true,
      },
      {
        key: "thiet-ke-co-dien",
        label: <div className="flex items-center gap-3">Thiết kế cơ điện </div>,
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
    console.log(key);
    setActiveKey((prevKey) => (prevKey === key ? null : key));
    if (!condition === true) {
      return;
    } else {
      console.log("open mega menu");
    }
  };
  useEffect(() => {
    const foundItem = menuItems.find((item) =>
      pathname.startsWith(`/${item.key}`)
    );
    setActiveKey(foundItem ? foundItem.key : null);
  }, [pathname, menuItems]);

  // mobileMenu
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("Menu clicked");
  };
  return (
    <header className="flex h-[100px] border-spacing-0 bg-white">
      <div className="hidden desktop:flex w-full max-w-full h-auto p-0 px-4 mobile:px-[15px] desktop:px-[135px] my-[30px] mx-auto justify-between">
        <div className="flex w-full">
          <Link href="/">
            <Image src={NTSLogo.src} alt="NTS Logo" width={80} height={40} />
          </Link>
          <ul className="hidden desktop:flex bg-transparent w-full  justify-between mx-8">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`border-b-2 border-transparent flex items-center
                 `}
              >
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                    handleToggleMegaMenu(item.key, item.showIcon);
                  }}
                  className={`font-inter text-base font-medium leading-6 text-left  flex items-center gap-3 cursor-pointer 
                  ${
                    activeKey === item.key ? "text-[#28A645]" : "text-[#3B559E]"
                  }
                  `}
                >
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
      <div className=" mobile:flex desktop:hidden w-full h-[72px] px-[15px] py-4 bg-white shadow justify-between items-center inline-flex">
        <Image
          className="w-[60px] h-10"
          src={NTSLogo.src}
          alt="logo"
          width={60}
          height={40}
        />
        <div className=" w-8 h-8 px-[0.85px] py-[6.30px] justify-center items-center ">
          <button
            className="w-[30.30px] h-[19.40px] relative"
            onClick={toggleMenu}
          >
            <IconMenu />
          </button>
          <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
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
