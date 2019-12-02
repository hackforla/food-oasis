import React from "react";
import { useTranslation } from "react-i18next";

const Language = ({ language, languageAbbr, word }) => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <input
        type="checkbox"
        value={i18n.language.slice(0,2)}
        name={language}
        id={language}
        onChange={() => changeLanguage(languageAbbr)}
        checked={i18n.language === languageAbbr ? true : false}
      />
      <label for={language}>{word}</label>
    </div>
  );
};

export default Language;
