"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const NotFound = () => {
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="max-w-xl w-full mx-4 sm:mx-0 bg-white dark:bg-slate-800 border border-main/10 dark:border-slate-700 rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-3xl font-extrabold text-darkest dark:text-slate-100 mb-4">
          404
        </h1>
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
          {t("error")}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {t("notFoundMessage") || "Page not found"}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-main hover:bg-main/90 text-white rounded-md text-sm font-medium"
          >
            {t("back")}
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium"
          >
            {t("home")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
