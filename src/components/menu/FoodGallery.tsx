import useFoodFilter from "@/hooks/food/useFoodFilter";
import useFoods from "@/hooks/food/useFoods";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FiInbox, FiSearch } from "react-icons/fi";
import FoodCard from "./FoodCard";

export type FoodGalleryProps = {
  className?: string;
};

const FoodGallery = ({ className }: FoodGalleryProps) => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const searchQuery = searchParams?.get("search") || "";

  const { data: foods, isLoading } = useFoods(category);
  const t = useTranslations("menu");
  const filteredFoods = useFoodFilter(foods, searchQuery);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (!foods || foods.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <FiInbox className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          {t("noFoodsTitle")}
        </h3>
        <p className="text-slate-600">{t("noFoodsMessage")}</p>
      </div>
    );
  }

  if (filteredFoods.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <FiSearch className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          {t("noSearchResults") || "No results found"}
        </h3>
        <p className="text-slate-600">
          {t("tryDifferentSearch") ||
            `No dishes found matching "${searchQuery}"`}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-darkest">
          {searchQuery
            ? `${t("searchResults") || "Search Results"} (${
                filteredFoods.length
              })`
            : category
            ? t("categoryMenu")
            : t("allMenu")}
        </h2>
        <span className="text-xs sm:text-sm text-main font-medium">
          {filteredFoods.length}{" "}
          {filteredFoods.length === 1 ? t("dish") : t("dishes")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredFoods.map((food) => {
          const translatedName = food.translations?.[0]?.name || food.name;
          const translatedDescription =
            food.translations?.[0]?.description || food.description;

          return (
            <FoodCard
              key={food.id}
              food={food}
              translatedName={translatedName}
              translatedDescription={translatedDescription}
              t={t}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodGallery;
