"use client";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import useLanguage from "@/hooks/common/useLanguage";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
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
        id="language-selector"
        name="language"
        aria-label="Select language"
        title="Select language"
        autoComplete="language"
        onChange={handleChange}
        className={`
          appearance-none cursor-pointer
          px-1.5 sm:px-2 py-1 sm:py-1.5 pr-5 sm:pr-6
          text-xs sm:text-sm font-medium
          bg-white dark:bg-slate-700
          border border-slate-300 dark:border-slate-600
          rounded-md
          text-slate-700 dark:text-slate-200
          hover:border-slate-400 dark:hover:border-slate-500
          focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent
          transition-colors
          ${className}
        `}
      >
        {SUPPORTED_LANGS.map((lang) => (
          <option key={lang} value={lang}>
            {languageLabels[lang]}
          </option>
        ))}
      </select>
      {/* Dropdown Arrow Icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2 pointer-events-none">
        <FiChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-500" />
      </div>
    </div>
  );
};

export default LanguageSelector;
