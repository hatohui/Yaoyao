"use client";

import { Language, SUPPORTED_LANGS } from "@/common/language";
import useLanguage from "@/hooks/useLanguage";
import React from "react";

const LanguageSelector = () => {
  const { locale, changeLanguage } = useLanguage();

  return (
    <select
      value={locale}
      onChange={(e) => changeLanguage(e.target.value as Language)}
    >
      {SUPPORTED_LANGS.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
