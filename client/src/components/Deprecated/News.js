import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/UI";

// Temporarily keep this page, even though it does not appear
// in the application, because it shows how to implement
// internationalization

const News = () => {
  const { t, i18n } = useTranslation("news");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  console.log(i18n.language);

  return (
    <>
      <div>{t("title")}</div>
      <div>{t("description")}</div>
      <Button onClick={() => changeLanguage("es")}>es</Button>
      <Button onClick={() => changeLanguage("en")}>en</Button>
    </>
  );
};

export default News;
