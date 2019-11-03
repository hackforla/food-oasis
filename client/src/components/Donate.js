import React from "react";
import { useTranslation } from "react-i18next";

const Donate = () => {
  const { t } = useTranslation("donate");

  return (
    <>
      <h2>{t("title")}</h2>
      <img alt="Hack for LA logo" />
      <img alt="Code for America logo" />
      <h2>{t("support")}</h2>
      <p>{t("support-p")}</p>
      <button>{t("donate")}</button>
    </>
  );
};

export default Donate;
