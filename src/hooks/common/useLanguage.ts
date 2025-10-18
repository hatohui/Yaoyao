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

    const urlLang = params?.get("lang") as Language | undefined;
    // If the URL already contains a supported lang, prefer that and
    // set the cookie to match so subsequent visits keep the preference.
    if (urlLang && SUPPORTED_LANGS.includes(urlLang)) {
      // If cookie is missing or different, update it and state.
      if (!cookie || cookie !== urlLang) {
        document.cookie = `locale=${urlLang}; path=/; max-age=31536000`;
        setLocale(urlLang);
      } else {
        // cookie matches urlLang, ensure state follows cookie
        setLocale(cookie);
      }

      // Ensure URL stays consistent (no double navigation if already set)
      const newPath = setNewParamString(params, "lang", urlLang);
      router.replace(newPath);
      return;
    }

    if (cookie && SUPPORTED_LANGS.includes(cookie)) {
      setLocale(cookie);

      if (urlLang !== cookie) {
        const newPath = setNewParamString(params, "lang", cookie);
        router.replace(newPath);
      }
    } else {
      const defaultLocale =
        (navigator.language.slice(0, 2) as Language) || "en";
      if (SUPPORTED_LANGS.includes(defaultLocale)) {
        setLocale(defaultLocale);
        document.cookie = `locale=${defaultLocale}; path=/; max-age=31536000`;

        if (urlLang !== defaultLocale) {
          const newPath = setNewParamString(params, "lang", defaultLocale);
          router.replace(newPath);
        }
      }
    }
  }, [params, router]);

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
