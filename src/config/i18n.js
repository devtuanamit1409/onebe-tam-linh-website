import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["vi", "en"],
    ns: ["home"],
    defaultNS: "home",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },

    backend: {
      loadPath: "/public/locales/{{lng}}/{{ns}}.json",
    },
    // react: {
    //   useSuspense: false,
    // },
  });

export default i18n;
