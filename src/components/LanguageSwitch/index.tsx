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

  // Cập nhật bảng ánh xạ slug giữa các ngôn ngữ để bao gồm cả hai hướng
  const slugMap: { [key: string]: string } = {
    "/en": "/",
    "/en/neww-post": "/bai-viet", // Đường dẫn tiếng Anh đến tiếng Việt
    "/bai-viet": "/en/neww-post", // Đường dẫn tiếng Việt đến tiếng Anh
  };

  function handleLocaleChange(newLocale: Locale): void {
    if (newLocale === locale) {
      return;
    }

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Sử dụng bảng ánh xạ để tìm URL mới
    const newUrl = slugMap[pathname] || pathname; // Nếu không tìm thấy ánh xạ, giữ nguyên pathname
    router.push(newUrl);
  }

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
      <Space className="text-blue-600 font-medium py-2 px-4 rounded inline-flex items-center">
        <IconGlobe />
      </Space>
    </Dropdown>
  );
};

export default LanguageSwitch;
