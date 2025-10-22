"use client";
import React from "react";
import { useTranslations } from "next-intl";

type ResultsCountProps = {
  totalResults?: number;
};

const ResultsCount = ({ totalResults }: ResultsCountProps) => {
  const t = useTranslations("menu");
  const tDashboard = useTranslations("dashboard");

  if (totalResults === undefined) return null;

  return (
    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {totalResults}
        </span>{" "}
        {t("dishes")} {tDashboard("found") || "found"}
      </p>
    </div>
  );
};

export default ResultsCount;
