import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

const News = () => {
  const { t, i18n } = useTranslation("translation");

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <button onClick={() => changeLanguage("es")}>es</button>
        <button onClick={() => changeLanguage("en")}>en</button>
      </div>
      <div>{t("news")}</div>
    </Suspense>
  );
};

export default News;
