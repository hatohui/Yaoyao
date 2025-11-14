"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TranslatedFood } from "@/types/models/food";
import { Category } from "@prisma/client";
import { useFoodAvailabilityMutation } from "@/hooks/food/useFoodAvailabilityMutation";
import { FiEye, FiEyeOff, FiEdit2 } from "react-icons/fi";

type FoodGridViewProps = {
  foods?: TranslatedFood[];
  categories?: (Category & { translation?: Array<{ name: string }> })[];
  onEditFood: (food: TranslatedFood) => void;
};

const FoodGridView = ({ foods, categories, onEditFood }: FoodGridViewProps) => {
  const t = useTranslations("menu");

  if (!foods || foods.length === 0) {
    return (
      <div className="hidden md:block bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="py-16 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            {t("noFoodsMessage") || "No foods found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {foods.map((food) => {
          const translatedName = food.translations?.[0]?.name || food.name;
          const category = categories?.find((c) => c.id === food.categoryId);
          const categoryName =
            category?.translation?.[0]?.name || category?.name || "-";

          return (
            <FoodGridCard
              key={food.id}
              food={food}
              translatedName={translatedName}
              categoryName={categoryName}
              t={t}
              onEdit={() => onEditFood(food)}
            />
          );
        })}
      </div>
    </div>
  );
};

type FoodGridCardProps = {
  food: TranslatedFood;
  translatedName: string;
  categoryName: string;
  t: (key: string) => string;
  onEdit: () => void;
};

const FoodGridCard = ({
  food,
  translatedName,
  categoryName,
  t,
  onEdit,
}: FoodGridCardProps) => {
  const availabilityMutation = useFoodAvailabilityMutation(food.id);

  const handleToggle = () => {
    availabilityMutation.mutate(!food.available);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full h-48 bg-slate-200 dark:bg-slate-700 flex-shrink-0">
        {food.imageUrl ? (
          <Image
            src={food.imageUrl}
            alt={translatedName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
            <span className="text-sm">No image</span>
          </div>
        )}
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          {food.available ? (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/90 backdrop-blur-sm">
              <FiEye className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600/90 backdrop-blur-sm">
              <FiEyeOff className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Food Name */}
        <h3
          className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-2 truncate"
          title={translatedName}
        >
          {translatedName}
        </h3>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
            <span className="truncate">{categoryName}</span>
          </span>
        </div>

        {/* Variants */}
        <div className="flex-1">
          {food.variants && food.variants.length > 0 && (
            <div className="mb-3 space-y-1">
              {food.variants.slice(0, 3).map((variant, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs">
                  {variant.isSeasonal ? (
                    <span className="inline-block px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-medium rounded truncate">
                      {t("seasonal")}
                    </span>
                  ) : (
                    <>
                      {variant.label && (
                        <span className="text-slate-600 dark:text-slate-400 truncate">
                          {variant.label}
                        </span>
                      )}
                      {variant.price && (
                        <span className="font-semibold text-main dark:text-main whitespace-nowrap">
                          {variant.price} RM
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
              {food.variants.length > 3 && (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  +{food.variants.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-600">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all shadow-sm bg-slate-600 dark:bg-slate-500 hover:bg-slate-700 dark:hover:bg-slate-400 text-white hover:shadow"
            title="Edit"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleToggle}
            disabled={availabilityMutation.isPending}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
              food.available
                ? "bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-300 hover:shadow"
                : "bg-green-500 hover:bg-green-600 text-white hover:shadow-md"
            }`}
            title={food.available ? t("lockItem") : t("unlockItem")}
          >
            {availabilityMutation.isPending ? (
              "..."
            ) : food.available ? (
              <>
                <FiEyeOff className="w-3.5 h-3.5" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <FiEye className="w-3.5 h-3.5" />
                <span>Show</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodGridView;
