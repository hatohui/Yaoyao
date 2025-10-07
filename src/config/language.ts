import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { Language, SUPPORTED_LANGS } from "@/common/language";

export default getRequestConfig(async ({ locale }) => {
  const cookieLocale = (await cookies()).get("locale")?.value;

  const validLocale =
    SUPPORTED_LANGS.includes(locale as Language) && typeof locale === "string"
      ? locale
      : cookieLocale ?? "en";

  return {
    locale: validLocale,
    messages: (await import(`@/language/${validLocale}.json`)).default,
  };
});
