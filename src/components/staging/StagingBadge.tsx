"use client";
import React from "react";
import { FiClock } from "react-icons/fi";
import { useTranslations } from "next-intl";

const StagingBadge = () => {
  const t = useTranslations("staging");

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700">
      <FiClock className="w-3 h-3" />
      {t("staging") || "Staging"}
    </span>
  );
};

export default StagingBadge;
