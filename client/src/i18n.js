import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

/*
To load in FAQs from the backend, we'll query all the FAQs from the database
  - en
  - es
Then add a property to the 'en' and 'es' files up above
  ex. en['faq'] = {JSON object that holds the questions and answers}
      es['faq'] = {JSON object that holds the questions and answers}
*/

const resources = {
  en,
  es
};

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
    resources,
    fallbackLng: "en",
    debug: true,
    react: {
      useSuspense: false
    },
    ns: ["news", "about", "donate"]
  });

export default i18n;
