"use client";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import useLanguage from "@/hooks/common/useLanguage";
import React from "react";

const LanguageSelector = () => {
  const { locale, changeLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value as Language);
  };

  // Language labels with flags
  const languageLabels: Record<Language, string> = {
    en: "🇬🇧 EN",
    zh: "🇨🇳 中文",
    th: "🇹🇭 ไทย",
    vi: "🇻🇳 Tiếng Việt",
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={handleChange}
        className="
          appearance-none cursor-pointer
          px-2 sm:px-3 py-1 sm:py-1.5 pr-6 sm:pr-8
          text-xs sm:text-sm font-medium
          bg-white
          border border-slate-300
          rounded-md
          text-slate-700
          hover:border-slate-400
          focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent
          transition-colors
        "
      >
        {SUPPORTED_LANGS.map((lang) => (
          <option key={lang} value={lang}>
            {languageLabels[lang]}
          </option>
        ))}
      </select>
      {/* Dropdown Arrow Icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2 pointer-events-none">
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
