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

const Header: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(pathname);
  const menuItems = useMemo(
    () => [
      {
        key: "xu-ly-nuoc",
        label: (
          <div className="flex items-center gap-3">
            Xử lý nước{" "}
            {activeKey === "xu-ly-nuoc" ? <IconAngleUp /> : <IconAngleDown />}
          </div>
        ),
      },
      {
        key: "thiet-ke-co-dien",
        label: (
          <div className="flex items-center gap-3">
            Thiết kế cơ điện{" "}
            {activeKey === "thiet-ke-co-dien" ? (
              <IconAngleUp />
            ) : (
              <IconAngleDown />
            )}
          </div>
        ),
      },
      {
        key: "du-an",
        label: (
          <div className="flex items-center gap-3">
            Dự án {activeKey === "du-an" ? <IconAngleUp /> : <IconAngleDown />}
          </div>
        ),
      },
      {
        key: "doi-tac",
        label: (
          <Link href="/doi-tac" className="flex items-center gap-3">
            Đối tác
          </Link>
        ),
      },
      {
        key: "ve-chung-toi",
        label: (
          <div className="flex items-center gap-3">
            Về chúng tôi{" "}
            {activeKey === "ve-chung-toi" ? <IconAngleUp /> : <IconAngleDown />}
          </div>
        ),
      },
      {
        key: "tin-tuc",
        label: (
          <Link href="/tin-tuc" className="flex items-center gap-3">
            Tin tức
          </Link>
        ),
      },
      {
        key: "thong-tu-nghi-dinh",
        label: (
          <div className="flex items-center gap-3">
            Thông tư - Nghị định{" "}
            {activeKey === "thong-tu-nghi-dinh" ? (
              <IconAngleUp />
            ) : (
              <IconAngleDown />
            )}
          </div>
        ),
      },
    ],
    []
  );
  // get pathname to active navigation
  useEffect(() => {
    console.log("pathname to active navigation", pathname);
    setActiveKey(pathname);
  }, [pathname]);
  const handleToggleDropdown = (key: string) => {
    console.log(key);
    setActiveKey((prevKey) => (prevKey === key ? null : key));
  };
  useEffect(() => {
    const foundItem = menuItems.find((item) =>
      pathname.startsWith(`/${item.key}`)
    );
    setActiveKey(foundItem ? foundItem.key : null);
  }, [pathname, menuItems]);
  console.log("rerender");
  return (
    <header className="flex h-[100px] border-spacing-0 bg-white">
      <div className="w-full max-w-full h-auto p-0 px-[135px] my-[30px] mx-auto flex justify-between">
        <div className="flex w-full">
          <Link href="/">
            <Image src={NTSLogo} alt="NTS Logo" />
          </Link>
          <ul className="bg-transparent w-full flex justify-between mx-8">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`border-b-2 border-transparent flex items-center
                 `}>
                <div
                  onClick={(event) => {
                    event.stopPropagation(); // Ngăn chặn lan truyền sự kiện
                    handleToggleDropdown(item.key);
                  }}
                  className={`font-inter text-base font-medium leading-6 text-left  flex items-center gap-3 cursor-pointer 
                  ${
                    activeKey === item.key ? "text-[#28A645]" : "text-[#3B559E]"
                  }
                  `}>
                  {item.label}
                  {/* {activeKey === item.key ? <IconAngleUp /> : <IconAngleDown />} */}
                </div>
              </li>
            ))}
          </ul>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
};
export default Header;
