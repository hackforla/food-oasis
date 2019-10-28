import React from "react";
import { useTranslation } from "react-i18next";

const News = () => {
  const { t, i18n } = useTranslation("translation");

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div>{t("news.title")}</div>
      <div>{t("news.description")}</div>
      <button onClick={() => changeLanguage("es")}>es</button>
      <button onClick={() => changeLanguage("en")}>en</button>
    </>
  );
};

export default News;
