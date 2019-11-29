import React from "react";
import { useTranslation } from "react-i18next";

const LanguageChooser = () => {
  const { t, i18n } = useTranslation("choose-language");

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  console.log(i18n.language);

  return (
    <form>
      <p>Change Language: {i18n.language}</p>
      <div>
        <input
          type="checkbox"
          value={i18n.language}
          name="espanol"
          id="espanol"
          onChange={() => changeLanguage("es")}
          checked={i18n.language === "es" ? true : false}
        />
        <label for="espanol">Spanish</label>
      </div>
      <div>
        <input
          type="checkbox"
          value={i18n.language}
          name="english"
          id="english"
          onChange={() => changeLanguage("en")}
          checked={i18n.language === "en" ? true : false}
        />
        <label for="english">English</label>
      </div>
    </form>
  );
};

export default LanguageChooser;
