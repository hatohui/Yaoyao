"use client";
import useCategories from "@/hooks/useCategories";
import { setNewParamString } from "@/utils/setParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const Categories = ({ className }: { className?: string }) => {
  const { data: categories, isLoading } = useCategories();
  const router = useRouter();
  const params = useSearchParams();
  const t = useTranslations("menu");

  const currentCategory = params?.get("category");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-600 border-r-transparent"></div>
      </div>
    );
  }

  const handleCategoryClick = (category: string) => {
    const query = category.split(" ")[0].toLowerCase();
    router.push(setNewParamString(params, "category", query));
  };

  const handleShowAll = () => {
    router.push("/menu");
  };

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
        {t("categories")}
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleShowAll}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            !currentCategory
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-slate-700 border border-slate-300 hover:border-blue-400 hover:bg-blue-50"
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
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-blue-400 hover:bg-blue-50"
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
