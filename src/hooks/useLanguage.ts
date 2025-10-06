import { Language } from "@/common/language";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useLanguage = () => {
  const [locale, setLocale] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];

    if (cookie) {
      setLocale(cookie);
    } else {
      const defaultLocale = navigator.language.slice(0, 2);
      setLocale(defaultLocale);
      document.cookie = `locale=${defaultLocale}; path=/`;
      router.refresh();
    }
  }, [router]);

  const changeLanguage = (newLocale: Language) => {
    document.cookie = `locale=${newLocale}; path=/`;
    setLocale(newLocale);
    router.refresh();
  };

  return { locale, changeLanguage };
};

export default useLanguage;
