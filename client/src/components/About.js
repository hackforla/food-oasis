import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      <h1>{t("about.title")}</h1>
      <p>{t("about.p1")}</p>
      <p>{t("about.p2")}</p>
      <h2>{t("about.support")}</h2>
      <p>{t("about.support-p")}</p>
      <button>{t("about.donate")}</button>
      <h2>{t("about.use")}</h2>
      <div>
        <h2>{t("about.stakeholder-1")}</h2>
        <p>
          <strong>{t("about.stakeholder-1ps")}</strong>
        </p>
        <p>{t("about.stakeholder-1p")}</p>
      </div>
      <div>
        <h2>{t("about.stakeholder-2")}</h2>
        <p>
          <strong>{t("about.stakeholder-2ps")}</strong>
        </p>
        <p>{t("about.stakeholder-2p")}</p>
      </div>
      <div>
        <h2>{t("about.stakeholder-3")}</h2>
        <p>
          <strong>{t("about.stakeholder-3ps")}</strong>
        </p>
        <p>{t("about.stakeholder-3p")}</p>
      </div>
      <h2>{t("about.mission")}</h2>
      <p>{t("about.mission-p")}</p>
      <h2>{t("about.team")}</h2>
      <p>{t("about.team-p")}</p>
      <h2>{t("about.about-hack")}</h2>
      <p>{t("about.about-hack-p")}</p>
    </>
  );
};

export default About;