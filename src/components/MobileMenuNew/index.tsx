import React, { useState, useEffect } from "react";
import { Menu, Spin } from "antd";
import NTSLogo from "../../../public/images/logo/logo.png";
import Image from "next/image";
import LanguageSwitch from "../LanguageSwitch";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import IconAngleRight from "../icons/IconAngleRight";
import Link from "next/link";
import IconClose from "../icons/IconClose";
import IconAngleDown from "../icons/IconAngleDown";
import IconAngleUp from "../icons/IconAngleUp";
import IconPlus from "../icons/IconPlus";
import IconMinus from "../icons/IconMinus";

type BaiViet = {
  title: string;
  url: string;
  icon: JSX.Element;
};

type SubItem = {
  title: string;
  description: string;
  url: string;
  key: any;
  icon: JSX.Element;
  baiViet: BaiViet[];
};

type MenuItem = {
  key: string;
  title: string;
  description: string;
  url: string;
  baiViet: BaiViet[];
  content: SubItem[];
};

type MobileMenuProps = {
  data: any;
  locale: string;
  isOpen: boolean;
  toggleMenu: () => void;
};

const MobileMenuNew: React.FC<MobileMenuProps> = ({
  data,
  locale,
  isOpen,
  toggleMenu,
}) => {
  const [mobileMenu, setMobileMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const newMegaMenu: MenuItem[] = data.map((item: any, index: number) => ({
        key: `${item.attributes.slug}-${index}`,
        title: item.attributes.name,
        description: item.attributes.description,
        url: `/${item.attributes.slug}`,
        baiViet: item.attributes.bai_viets.data.map((baiViet: any) => ({
          title: baiViet.attributes.title,
          url: `/${baiViet.attributes.slug}`,
          icon: <IconAngleRight width={"16"} height={"16"} />,
        })),
        content: item.attributes.danh_muc_cons.data.map(
          (subItem: any, subIndex: number) => ({
            key: `${item.attributes.slug}-${subItem.attributes.slug}-${subIndex}`,
            title: subItem.attributes.name,
            description: subItem.attributes.description,
            url: `${subItem.attributes.slug}`,
            icon: <IconAngleRightColorFull />,
            baiViet: subItem.attributes.bai_viets.data.map((baiViet: any) => ({
              title: baiViet.attributes.title,
              url: `/${baiViet.attributes.slug}`,
              icon: <IconAngleRight width={"16"} height={"16"} />,
            })),
          })
        ),
      }));

      setMobileMenu(newMegaMenu);
      setIsLoading(false);
    }
  }, [data]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const renderTitleWithIcon = (title: string, key: string) => {
    const isOpen = openKeys.includes(key);
    return (
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {isOpen ? (
          <IconAngleUp width="16" height="16" />
        ) : (
          <IconAngleDown width="16" height="16" />
        )}
      </div>
    );
  };
  const renderChildTitleWithIcon = (title: string, key: string) => {
    const isOpen = openKeys.includes(key);
    return (
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {isOpen ? <IconMinus /> : <IconPlus />}
      </div>
    );
  };

  const handleMenuClick = (key: string) => {
    setOpenKeys((prevOpenKeys) => {
      if (prevOpenKeys.includes(key)) {
        return prevOpenKeys.filter((openKey) => openKey !== key);
      } else {
        // Đảm bảo chỉ có một menu cha được mở cùng một lúc
        return [key];
      }
    });
  };

  const handleSubMenuClick = (key: string) => {
    setOpenKeys((prevOpenKeys) => {
      if (prevOpenKeys.includes(key)) {
        return prevOpenKeys.filter((openKey) => openKey !== key);
      } else {
        // Đảm bảo chỉ có một submenu con được mở cùng một lúc
        return [key];
      }
    });
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto`}>
      <div className="flex justify-between items-center mb-4 shadow px-[31px] py-4">
        <Link href={`/${locale}`} className="my-auto">
          <Image src={NTSLogo.src} alt="NTS Logo" width={60} height={40} />
        </Link>
        <button onClick={toggleMenu} className="text-lg">
          <IconClose />
        </button>
      </div>
      <LanguageSwitch />
      {isLoading ? (
        <Spin className="mt-4" />
      ) : (
        <Menu
          mode="inline"
          className="mt-4 flex flex-col gap-2"
          openKeys={openKeys}
          onOpenChange={onOpenChange}>
          {mobileMenu.map((item) => {
            if (item.baiViet.length === 0 && item.content.length === 0) {
              return (
                <Menu.Item
                  key={item.key}
                  className="text-black text-lg font-semibold leading-relaxed">
                  <Link href={item.url}>{item.title}</Link>
                </Menu.Item>
              );
            }
            return (
              <Menu.SubMenu
                key={item.key}
                title={renderTitleWithIcon(item.title, item.key)}
                onTitleClick={() => handleMenuClick(item.key)}
                className="text-black text-lg font-semibold px-0">
                <Menu.Item className="text-indigo-800 text-base font-normal leading-relaxed  ">
                  <Link
                    href={`${item.url}`}
                    className="!text-indigo-800 text-base font-normal leading-relaxed px-0">
                    {locale && locale === "vi" ? "Đến trang" : "Go to"}{" "}
                    {item.title}
                  </Link>
                </Menu.Item>
                {item.baiViet.map((baiViet) => (
                  <Menu.Item
                    key={baiViet.url}
                    className="!text-gray-500 !text-base !font-normal  leading-relaxed">
                    <Link href={baiViet.url}>{baiViet.title}</Link>
                  </Menu.Item>
                ))}

                {item.content.map((subItem) => (
                  <>
                    <React.Fragment key={subItem.key}>
                      {subItem.baiViet.length > 0 ? (
                        <Menu.SubMenu
                          key={subItem.key}
                          title={renderChildTitleWithIcon(
                            subItem.title,
                            subItem.key
                          )}
                          onTitleClick={() => handleSubMenuClick(subItem.key)}
                          className="!text-base !font-normal !text-[#000]">
                          {subItem.baiViet.map((baiViet) => (
                            <Menu.Item
                              key={baiViet.url}
                              className="!text-gray-500 !text-base !font-normal  leading-relaxed">
                              <Link href={baiViet.url}>{baiViet.title}</Link>
                            </Menu.Item>
                          ))}
                        </Menu.SubMenu>
                      ) : (
                        <Menu.Item
                          key={subItem.key}
                          className="!text-base !font-normal !text-[#000]">
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </Menu.Item>
                      )}
                    </React.Fragment>
                  </>
                ))}
              </Menu.SubMenu>
            );
          })}
        </Menu>
      )}
    </div>
  );
};

export default MobileMenuNew;
