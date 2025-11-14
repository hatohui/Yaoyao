"use client";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { useTranslations } from "next-intl";

type PresetMenuHeaderProps = {
  totalResults?: number;
  onAddPreset: () => void;
  onCreateNewFood: () => void;
};

const PresetMenuHeader = ({
  totalResults,
  onAddPreset,
  onCreateNewFood,
}: PresetMenuHeaderProps) => {
  const t = useTranslations("presetMenu");

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="p-4">
        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-darkest dark:text-white flex items-center gap-2">
              {t("title")}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t("subtitle")}
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onCreateNewFood}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow"
            >
              <FiPlus className="w-5 h-5" />
              <span>{t("createNewFood")}</span>
            </button>
            <button
              onClick={onAddPreset}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-main hover:bg-main/90 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow"
            >
              <FiPlus className="w-5 h-5" />
              <span>{t("addToPreset")}</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        {totalResults !== undefined && (
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {totalResults}{" "}
            {totalResults === 1 ? t("presetItem") : t("presetItems")}
          </div>
        )}
      </div>
    </div>
  );
};

export default PresetMenuHeader;
