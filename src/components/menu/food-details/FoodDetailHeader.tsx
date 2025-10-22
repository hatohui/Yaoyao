"use client";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslations } from "next-intl";

type FoodDetailHeaderProps = {
  name: string;
  available: boolean;
};

const FoodDetailHeader = ({ name, available }: FoodDetailHeaderProps) => {
  const t = useTranslations("menu");

  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        {/* Back Button */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-main dark:hover:text-main transition-colors mb-3"
        >
          <FiArrowLeft className="w-4 h-4" />
          {t("backToMenu")}
        </Link>

        {/* Title and Availability */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {name}
            </h1>
          </div>

          {/* Availability Badge */}
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              available
                ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
            }`}
          >
            {available ? t("available") : t("unavailable")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailHeader;
