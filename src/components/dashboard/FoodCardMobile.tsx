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
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">
              {translatedName}
            </h3>
            <span className="inline-block mt-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {categoryName}
            </span>
          </div>
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 ${
              food.available
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
            }`}
          >
            {food.available ? t("available") : t("unavailable")}
          </div>
        </div>
      </div>

      {/* Variants */}
      {food.variants && food.variants.length > 0 && (
        <div className="p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            {t("variants") || "Variants"}
          </h4>
          <div className="space-y-2">
            {food.variants.map((variant) => (
              <div
                key={variant.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/30"
              >
                <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
                  {variant.label}
                </span>
                <div className="flex items-center gap-2">
                  {variant.price && (
                    <span className="font-semibold text-sm text-main dark:text-main">
                      {variant.price} RM
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      variant.available
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {variant.available
                      ? t("available") || "Available"
                      : t("unavailable") || "Unavailable"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      <div className="p-4 bg-slate-50 dark:bg-slate-700/30">
        <button
          onClick={handleToggleFood}
          disabled={availabilityMutation.isPending}
          className={`w-full px-4 py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
            food.available
              ? "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
              : "bg-green-500 hover:bg-green-600 text-white hover:shadow-md"
          }`}
        >
          {availabilityMutation.isPending
            ? "..."
            : food.available
            ? t("hideItem") || "Hide Item"
            : t("showItem") || "Show Item"}
        </button>
      </div>
    </div>
  );
};

export default FoodCardMobile;
