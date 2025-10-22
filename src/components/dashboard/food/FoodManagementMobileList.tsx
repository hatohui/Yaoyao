"use client";
import React from "react";
import FoodCardMobile from "../FoodCardMobile";
import { TranslatedFood } from "@/types/models/food";
import { Category } from "@prisma/client";
import { useTranslations } from "next-intl";

type FoodManagementMobileListProps = {
  foods?: TranslatedFood[];
  categories?: (Category & { translation?: Array<{ name: string }> })[];
};

const FoodManagementMobileList = ({
  foods,
  categories,
}: FoodManagementMobileListProps) => {
  const t = useTranslations("menu");

  if (!foods || foods.length === 0) {
    return (
      <div className="md:hidden bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="py-16 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            {t("noFoodsMessage") || "No foods found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-3">
      {foods.map((food) => {
        const translatedName = food.translations?.[0]?.name || food.name;
        const category = categories?.find((c) => c.id === food.categoryId);
        const categoryName =
          category?.translation?.[0]?.name || category?.name || "-";

        return (
          <FoodCardMobile
            key={food.id}
            food={food}
            translatedName={translatedName}
            categoryName={categoryName}
          />
        );
      })}
    </div>
  );
};

export default FoodManagementMobileList;
