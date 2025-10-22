"use client";
import React from "react";
import { TranslatedFood } from "@/types/models/food";
import { useFoodAvailabilityMutation } from "@/hooks/food/useFoodAvailabilityMutation";
import { useTranslations } from "next-intl";

type FoodCardMobileProps = {
  food: TranslatedFood;
  translatedName: string;
  categoryName: string;
};

const FoodCardMobile = ({
  food,
  translatedName,
  categoryName,
}: FoodCardMobileProps) => {
  const availabilityMutation = useFoodAvailabilityMutation(food.id);
  const t = useTranslations("menu");

  const handleToggleFood = () => {
    availabilityMutation.mutate(!food.available);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
            {translatedName}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            {categoryName}
          </p>
        </div>
        <button
          onClick={handleToggleFood}
          disabled={availabilityMutation.isPending}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
            food.available
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          {food.available ? t("available") : t("unavailable")}
        </button>
      </div>

      {/* Variants */}
      {food.variants && food.variants.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            {t("variants") || "Variants"}
          </h4>
          <div className="space-y-1.5">
            {food.variants.map((variant) => (
              <div
                key={variant.id}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-slate-700 dark:text-slate-300">
                  {variant.label}
                </span>
                <span
                  className={
                    variant.available
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-400 dark:text-slate-500"
                  }
                >
                  {variant.available
                    ? t("available") || "Available"
                    : t("unavailable") || "Unavailable"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCardMobile;
