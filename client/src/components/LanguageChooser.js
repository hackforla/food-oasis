import React from "react";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  language: {
    position: "absolute",
    bottom: 0,
    margin: "16px"
  }
});

const LanguageChooser = () => {
  const { t, i18n } = useTranslation("choose-language");
  const classes = useStyles();

  return (
    <div className={classes.language}>
      <p>
        {t("choose")}: {i18n.language.slice(0, 2).toUpperCase()}
      </p>
      <Language language={"english"} languageAbbr={"en"} word={"English"} />
      <Language language={"espanol"} languageAbbr={"es"} word={"Spanish"} />
    </div>
  );
};

export default LanguageChooser;
