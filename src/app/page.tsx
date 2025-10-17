"use client";
import React from "react";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("common");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-darkest dark:text-slate-100 mb-4">
          {t("welcome")}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-main dark:text-main font-medium">
          Welcome to Yao Yao Restaurant
        </p>
      </div>
    </div>
  );
};

export default HomePage;
