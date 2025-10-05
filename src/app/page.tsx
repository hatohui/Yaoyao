"use client";
import React from "react";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("common");

  return (
    <div>
      <h1>{t("welcome")}</h1>
    </div>
  );
};

export default HomePage;
