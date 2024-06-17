"use client";
import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Space } from "antd";
import IconGlobe from "../icons/IconGlobe";
import { type Locale } from "../../locales";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ENDPOINT } from "@/enums/endpoint.enum";
import { apiService } from "@/services/api.service";

interface LanguageSwitchProps {
  initialLanguage: string;
}

const LanguageSwitch: React.FC = () => {
  const [dataBaiViet, setDataBaiViet] = useState<any>(null);
  const [slugMap, setSlugMap] = useState<{ [key: string]: string }>({
    "/en": "/vi",
    "/vi": "/en",
    "/en/ve-chung-toi": "/ve-chung-toi",
    "/ve-chung-toi": "/en/ve-chung-toi",
    "/en/san-pham": "/san-pham",
    "/san-pham": "/en/san-pham",
  });

  const updateSlugMap = (data: any) => {
    const newSlugMap = { ...slugMap };
    data.data.forEach((item: any) => {
      if (
        item.attributes.locale === "vi" &&
        item.attributes.localizations.data.length > 0
      ) {
        newSlugMap[
          `/${item.attributes.slug}`
        ] = `/en/${item.attributes.localizations.data[0].attributes.slug}`;
      } else if (
        item.attributes.locale === "en" &&
        item.attributes.localizations.data.length > 0
      ) {
        newSlugMap[
          `/en/${item.attributes.slug}`
        ] = `/${item.attributes.localizations.data[0].attributes.slug}`;
      }
    });
    setSlugMap(newSlugMap);
  };

  async function fetchData() {
    try {
      const data = await apiService.get(
        `${ENDPOINT.GET_BAIVIET}?locale=vi&locale=en&populate=localizations`
      );

      setDataBaiViet(data);
      updateSlugMap(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const locale = useLocale() as Locale;

  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(newLocale: Locale): void {
    if (newLocale === locale) {
      return;
    }

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    const newUrl = slugMap[pathname] || pathname;
    router.replace(newUrl);
  }

  const menu = (
    <Menu>
      <Menu.Item key="vi" onClick={() => handleLocaleChange("vi")}>
        Tiếng Việt
      </Menu.Item>
      <Menu.Item key="en" onClick={() => handleLocaleChange("en")}>
        English
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
