import React from "react";
import { useTranslation } from "react-i18next";
import WorldFlag from "react-world-flags";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button
        onClick={() => changeLanguage("en")}
        style={{ backgroundColor: "#2b3858" }}
      >
        <WorldFlag code="GB" style={{ width: 30, height: 20 }} />
      </button>
      {/* English - EN */}
      <button
        onClick={() => changeLanguage("fr")}
        style={{ backgroundColor: "#2b3858" }}
      >
        <WorldFlag code="FR" style={{ width: 30, height: 20 }} />
      </button>
      {/* français - FR */}
    </div>
  );
};

export default LanguageSwitcher;
