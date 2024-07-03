import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitch from "../LanguageSwitch";
import IconClose from "../icons/IconClose";
import IconAngleDown from "../icons/IconAngleDown";
import IconAngleUp from "../icons/IconAngleUp";
import IconPlus from "../icons/IconPlus";
import IconMinus from "../icons/IconMinus";
import Loading from "../Loading";
import { apiService } from "@/services/api.service";
import { useTranslations } from "next-intl";
import NTSLogo from "../../../public/images/logo/logo.png";

const MobileMenuNew = ({
  menuItems,
  loading,
  locale,
  isOpen,
  toggleMenu,
}: {
  menuItems: any;
  loading: boolean;
  locale: string;
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [openSubKeys, setOpenSubKeys] = useState<{ [key: string]: string[] }>(
    {}
  );

  const rootSubmenuKeys = menuItems.map((item: any) => item.key);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSubOpenChange = (rootKey: string, keys: string[]) => {
    const latestOpenKey = keys.find(
      (key) => openSubKeys[rootKey]?.indexOf(key) === -1
    );
    setOpenSubKeys({
      ...openSubKeys,
      [rootKey]: latestOpenKey ? [latestOpenKey] : [],
    });
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

  const renderChildTitleWithIcon = (
    title: string,
    key: string,
    rootKey: string
  ) => {
    const isOpen = openSubKeys[rootKey] && openSubKeys[rootKey].includes(key);
    return (
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {isOpen ? <IconMinus /> : <IconPlus />}
      </div>
    );
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
      {loading ? (
        <Loading />
      ) : (
        <Menu
          mode="inline"
          className="mt-4 flex flex-col gap-2"
          openKeys={openKeys}
          onOpenChange={onOpenChange}>
          {menuItems.map((item: any) => {
            if (!item.danhMuc || item.danhMuc.length === 0) {
              return (
                <Menu.Item
                  key={item.key}
                  className="text-black text-lg font-semibold leading-relaxed">
                  <Link
                    href={item.pathname}
                    className="!text-black !text-lg !font-semibold leading-relaxed">
                    {item.name}
                  </Link>
                </Menu.Item>
              );
            }
            return (
              <Menu.SubMenu
                key={item.key}
                title={renderTitleWithIcon(item.name, item.key)}
                className="text-black text-lg font-semibold px-0">
                <Menu
                  mode="inline"
                  openKeys={openSubKeys[item.key] || []}
                  onOpenChange={(keys) => onSubOpenChange(item.key, keys)}>
                  {item.key === "Về chúng tôi" ? null : (
                    <Menu.Item className="text-[#3B559E] text-base font-normal leading-relaxed">
                      <Link
                        href={item.pathname}
                        className="!text-[#3B559E] text-base font-normal leading-relaxed px-0">
                        {locale === "vi" ? "Đến trang " : "Go to "} {item.name}
                      </Link>
                    </Menu.Item>
                  )}

                  {item.danhMuc.map((danhMucItem: any) => {
                    if (
                      !danhMucItem.baiViet ||
                      danhMucItem.baiViet.length === 0
                    ) {
                      return (
                        <Menu.Item
                          key={danhMucItem.slug}
                          className="!text-base !font-normal !text-[#000]">
                          <Link
                            href={danhMucItem.slug}
                            className="!text-base !font-normal !text-[#000] ">
                            {danhMucItem.name}
                          </Link>
                        </Menu.Item>
                      );
                    }
                    return (
                      <Menu.SubMenu
                        key={danhMucItem.slug}
                        title={renderChildTitleWithIcon(
                          danhMucItem.name,
                          danhMucItem.slug,
                          item.key
                        )}
                        className="!text-base !font-normal !text-[#000] ">
                        <Menu.Item className="text-[#3B559E] text-base font-normal leading-relaxed">
                          <Link
                            href={danhMucItem.slug}
                            className="!text-[#3B559E] text-base font-normal leading-relaxed">
                            {locale === "vi" ? "Đến trang " : "Go to "}{" "}
                            {danhMucItem.name}
                          </Link>
                        </Menu.Item>
                        {danhMucItem.baiViet
                          .slice(0, 4)
                          .map((baiVietItem: any) => (
                            <Menu.Item
                              key={baiVietItem.slug}
                              className="text-[#3B559E] text-base font-normal leading-relaxed">
                              <Link
                                href={baiVietItem.slug}
                                className="!text-gray-500 !text-base !font-normal leading-relaxed">
                                {baiVietItem.title}
                              </Link>
                            </Menu.Item>
                          ))}
                      </Menu.SubMenu>
                    );
                  })}
                </Menu>
              </Menu.SubMenu>
            );
          })}
        </Menu>
      )}
    </div>
  );
};

export default MobileMenuNew;
