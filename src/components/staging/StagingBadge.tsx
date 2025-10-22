"use client";
import React from "react";
import { FiClock } from "react-icons/fi";
import { useTranslations } from "next-intl";

const StagingBadge = () => {
  const t = useTranslations("staging");

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 dark:bg-slate-950/50 text-white dark:text-dark-text border border-white/30 dark:border-main/30">
      <FiClock className="w-3 h-3" />
      {t("staging") || "Staging"}
    </span>
  );
};

export default StagingBadge;
