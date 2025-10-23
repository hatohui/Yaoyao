"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiUsers } from "react-icons/fi";

const PeopleInTableEmpty = () => {
  const t = useTranslations("tables");

  return (
    <div className="text-center py-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 mb-3">
        <FiUsers className="w-6 h-6 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
        {t("noGuests")}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        {t("noGuestsMessage")}
      </p>
    </div>
  );
};

export default PeopleInTableEmpty;
