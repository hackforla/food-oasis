import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import common_en from "./locales/en/translation.json";
import common_es from "./locales/es/translation.json";

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: common_en,
      es: common_es,
    },
    lng: "en",
    fallbackLng: ["en", "es"],
    debug: true,
    react: {
      useSuspense: false,
      // wait: true
    },
    ns: ["news", "about", "donate"],
  });

export default i18n;
