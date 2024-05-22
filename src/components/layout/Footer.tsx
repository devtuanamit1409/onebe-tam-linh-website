"use client";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("home");
  return (
    <footer>
      <h1>{t("welcome")}</h1>
    </footer>
  );
};
export default Footer;
