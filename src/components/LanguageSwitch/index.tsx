// components/LanguageSwitch.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import i18n from "../../config/i18n";
import IconGlobe from "../icons/IconGlobe";

const LanguageSwitch: React.FC = () => {
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const menu = (
    <Menu>
      <Menu.Item key="en" onClick={() => changeLanguage("en")}>
        English
      </Menu.Item>
      <Menu.Item key="vi" onClick={() => changeLanguage("vi")}>
        Tiếng Việt
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <button className="text-[#3B559E] font-medium py-2 px-4 rounded inline-flex items-center">
        <IconGlobe />
        <span className="ml-1">{i18n.language?.toUpperCase()}</span>
      </button>
    </Dropdown>
  );
};

export default LanguageSwitch;
