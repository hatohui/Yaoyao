"use client";
import useCategories from "@/hooks/food/useCategories";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { setParamAndResetPage, resetPageInParams } from "@/utils/pageParams";

const Categories = ({ className }: { className?: string }) => {
  const { data: categories, isLoading } = useCategories();
  const router = useRouter();
  const params = useSearchParams();
  const t = useTranslations("menu");

  const currentCategory = params?.get("category");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-main border-r-transparent"></div>
      </div>
    );
  }

  const handleCategoryClick = (category: string) => {
    const query = category.split(" ")[0].toLowerCase();
    const newParams = setParamAndResetPage(params, "category", query);
    router.push(`/menu?${newParams.toString()}`);
  };

  const handleShowAll = () => {
    const newParams = resetPageInParams(params);
    newParams.delete("category");
    const queryString = newParams.toString();
    router.push(`/menu${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className={className}>
      <h3 className="text-xs sm:text-sm font-semibold text-darkest dark:text-slate-200 mb-2 sm:mb-3 uppercase tracking-wide">
        {t("categories")}
      </h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        <button
          onClick={handleShowAll}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
            !currentCategory
              ? "bg-main text-white shadow-md"
              : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
          }`}
        >
          {t("allCategories")}
        </button>
        {categories?.map((category) => {
          const isActive =
            currentCategory === category.key.split(" ")[0].toLowerCase();
          return (
            <button
              key={category.id}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                isActive
                  ? "bg-main text-white shadow-md"
                  : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
              }`}
              onClick={() => handleCategoryClick(category.key)}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
