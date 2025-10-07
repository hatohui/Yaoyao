"use client";
import { Language } from "@/common/language";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useLanguage = () => {
  const [locale, setLocale] = useState<Language>("en");
  const queryClient = useQueryClient();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1] as Language | undefined;

    if (cookie) {
      setLocale(cookie);
    } else {
      const defaultLocale = navigator.language.slice(0, 2) as Language;
      setLocale(defaultLocale);
      document.cookie = `locale=${defaultLocale}; path=/`;
    }
  }, []);

  const changeLanguage = (newLocale: Language) => {
    document.cookie = `locale=${newLocale}; path=/`;
    setLocale(newLocale);
    try {
      queryClient.invalidateQueries({ queryKey: ["categories", locale] });
      queryClient.invalidateQueries({ queryKey: ["foods", locale] });
    } catch {
      queryClient.clear();
    }
  };

  return { locale, changeLanguage };
};

export default useLanguage;
