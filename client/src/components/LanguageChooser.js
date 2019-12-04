import React from "react";
import Language from "./Language";
import { useTranslation } from "react-i18next";

const LanguageChooser = () => {
  const { t, i18n } = useTranslation("choose-language");

  return (
    <form>
      <p>{t("choose")}: {i18n.language.slice(0,2).toUpperCase()}</p>
      <Language language={"english"} languageAbbr={"en"} word={"English"}/>
      <Language language={"espanol"} languageAbbr={"es"} word={"Spanish"}/>
    </form>
  );
};

export default LanguageChooser;
