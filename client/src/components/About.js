import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <h2>{t("support")}</h2>
      <p>{t("support-p")}</p>
      <button>{t("donate")}</button>
      <h2>{t("use")}</h2>
      <div>
        <h2>{t("stakeholder-1")}</h2>
        <p>
          <strong>{t("stakeholder-1ps")}</strong>
        </p>
        <p>{t("stakeholder-1p")}</p>
      </div>
      <div>
        <h2>{t("stakeholder-2")}</h2>
        <p>
          <strong>{t("stakeholder-2ps")}</strong>
        </p>
        <p>{t("stakeholder-2p")}</p>
      </div>
      <div>
        <h2>{t("stakeholder-3")}</h2>
        <p>
          <strong>{t("stakeholder-3ps")}</strong>
        </p>
        <p>{t("stakeholder-3p")}</p>
      </div>
      <h2>{t("mission")}</h2>
      <p>{t("mission-p")}</p>
      <h2>{t("team")}</h2>
      <p>{t("team-p")}</p>
      <h2>{t("about-hack")}</h2>
      <p>{t("about-hack-p")}</p>
    </>
  );
};

export default About;