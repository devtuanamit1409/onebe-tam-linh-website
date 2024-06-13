"use client";
import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Space } from "antd";

import IconGlobe from "../icons/IconGlobe";
import { type Locale } from "../../locales";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

interface LanguageSwitchProps {
  initialLanguage: string;
}

const LanguageSwitch: React.FC = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const slugMap: { [key: string]: string } = {
    "/en": "/vi",
    "/vi": "/en",
    "/en/ve-chung-toi": "/vi/ve-chung-toi",
    "/vi/ve-chung-toi": "/en/ve-chung-toi",
    "/en/neww-post": "/vi/bai-viet", // Đường dẫn tiếng Anh đến tiếng Việt
    "/vi/bai-viet": "/en/neww-post", // Đường dẫn tiếng Việt đến tiếng Anh
  };

  function handleLocaleChange(newLocale: Locale): void {
    console.log("Current locale:", locale);
    console.log("New locale:", newLocale);
    console.log("Current pathname:", pathname);

    if (newLocale === locale) {
      console.log("Same locale selected, no change.");
      return;
    }

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    const newUrl = slugMap[pathname] || pathname;
    console.log("New URL to navigate:", newUrl);
    router.replace(newUrl);
  }
  useEffect(() => {
    console.log("Current pathname updated to:", pathname);
  }, [pathname]);

  const menu = (
    <Menu>
      <Menu.Item key="en" onClick={() => handleLocaleChange("en")}>
        English
      </Menu.Item>
      <Menu.Item key="vi" onClick={() => handleLocaleChange("vi")}>
        Tiếng Việt
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottom">
      <Space className="text-[#3B559E] font-medium py-2 px-4 rounded flex  items-center">
        <span>{locale.toUpperCase()}</span>
        <IconGlobe />
      </Space>
    </Dropdown>
  );
};

export default LanguageSwitch;
