"use client";
import React, { useContext, useState } from "react";
import { Menu, Dropdown, Space } from "antd";
import i18n from "../../config/i18n";
import IconGlobe from "../icons/IconGlobe";
import { LanguageContext } from "../../context/LanguageContext";

interface LanguageSwitchProps {
  initialLanguage: string;
}

const LanguageSwitch: React.FC = () => {
  const contextValue = useContext(LanguageContext);

  if (!contextValue) {
    return <div>Language context is not available.</div>;
  }

  const { language, changeLanguage } = contextValue;
  const handleMenuClick = (e: any) => {
    changeLanguage(e.key);
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
    <Dropdown overlay={menu} placement="bottom">
      <Space className="text-blue-600 font-medium py-2 px-4 rounded inline-flex items-center">
        <IconGlobe /> {/* Sử dụng icon từ Ant Design 5 */}
        <span>{language.toUpperCase()}</span>
      </Space>
    </Dropdown>
  );
};

export default LanguageSwitch;
