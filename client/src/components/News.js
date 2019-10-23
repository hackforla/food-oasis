import React from "react";
import { useTranslation } from "react-i18next";

const News = () => {
  const { t, i18n } = useTranslation("translation");

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div>
        <button onClick={() => changeLanguage("es")}>es</button>
        <button onClick={() => changeLanguage("en")}>en</button>
      </div>
      <div>{t("news")}</div>
    </div>
  );
};

export default News;
