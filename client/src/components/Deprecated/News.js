import React from "react";
import { useTranslation } from "react-i18next";
import Controls from '../../components/UI';

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
      <Controls.Button 
        text='es'
        onClick={() => changeLanguage("es")}
      />
      <Controls.Button 
        text='en'
        onClick={() => changeLanguage("en")}
      />
    </>
  );
};

export default News;
