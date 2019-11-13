import React from "react";
import { useTranslation } from "react-i18next";

const News = () => {
  const { t, i18n } = useTranslation("news");

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div>{t("title")}</div>
      <div>{t("description")}</div>
      <button onClick={() => changeLanguage("es")}>es</button>
      <button onClick={() => changeLanguage("en")}>en</button>
    </>
  );
};

export default News;
