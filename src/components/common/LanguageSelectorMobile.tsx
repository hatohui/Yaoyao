"use client";
import { Language } from "@/common/language";
import useLanguage from "@/hooks/common/useLanguage";
import React from "react";

interface LanguageSelectorMobileProps {
  className?: string;
  onLanguageChange?: () => void;
}

const LanguageSelectorMobile = ({
  className,
  onLanguageChange,
}: LanguageSelectorMobileProps) => {
  const { locale, changeLanguage } = useLanguage();

  // Language labels with flags
  const languageOptions: { value: Language; label: string; flag: string }[] = [
    { value: "en", label: "English", flag: "🇬🇧" },
    { value: "zh", label: "中文", flag: "🇨🇳" },
    { value: "th", label: "ไทย", flag: "🇹🇭" },
    { value: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  ];

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
    onLanguageChange?.();
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {languageOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleLanguageChange(option.value)}
          className={`
            flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-all
            ${
              locale === option.value
                ? "bg-main text-white dark:bg-main/90"
                : "text-white/80 hover:bg-white/10 hover:text-white dark:text-slate-300 dark:hover:bg-slate-700"
            }
          `}
        >
          <span className="text-xl">{option.flag}</span>
          <span>{option.label}</span>
          {locale === option.value && (
            <span className="ml-auto text-xs">✓</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelectorMobile;
