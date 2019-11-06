import React from "react";
import { useTranslation } from "react-i18next";

const Organizations = () => {
  const { t } = useTranslation("organizations");

  // Return a list of organizations that are in Los Angeles
  // Not sure if need to be in database

  return (
    <>
      <div>{t("title")}</div>
    </>
  );
};

export default Organizations;
