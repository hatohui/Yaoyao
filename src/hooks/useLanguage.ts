"use client";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import { setNewParamString } from "@/utils/setParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useLanguage = (serverLocale: Language = "en") => {
  const [locale, setLocale] = useState<Language>(serverLocale);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1] as Language | undefined;

    if (cookie && SUPPORTED_LANGS.includes(cookie)) {
      setLocale(cookie);
    } else {
      const defaultLocale =
        (navigator.language.slice(0, 2) as Language) || "en";
      if (SUPPORTED_LANGS.includes(defaultLocale)) {
        setLocale(defaultLocale);
        document.cookie = `locale=${defaultLocale}; path=/; max-age=31536000`;
      }
    }
  }, []);

  const changeLanguage = (newLocale: Language) => {
    if (SUPPORTED_LANGS.includes(newLocale)) {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
      setLocale(newLocale);
      const newPath = setNewParamString(params, "lang", newLocale);
      router.push(newPath);
      router.refresh();
      return;
    }
  };

  return { locale, changeLanguage };
};

export default useLanguage;
