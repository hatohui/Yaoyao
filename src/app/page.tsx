"use client";
import React from "react";
import { useTranslations } from "next-intl";
import RestaurantVideo from "@/components/common/RestaurantVideo";
import useLanguage from "@/hooks/common/useLanguage";

const HomePage = () => {
  const t = useTranslations("common");
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center z-10 px-4 sm:px-6">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 dark:text-slate-100 mb-4 ${
            locale === "vi" ? "font-mon" : "font-serif"
          }`}
        >
          {t("welcome")}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-main-bright dark:text-main font-medium">
          {t.rich("landingSubtitle", {
            hatoLink: (chunks) => (
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-main"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
      <RestaurantVideo />
    </div>
  );
};

export default HomePage;
