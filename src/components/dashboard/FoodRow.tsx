"use client";
import React from "react";
import Image from "next/image";
import { useFoodAvailabilityMutation } from "@/hooks/food/useFoodAvailabilityMutation";
import { FiEye, FiEyeOff, FiEdit2 } from "react-icons/fi";

type FoodRowProps = {
  food: {
    id: string;
    name: string;
    available: boolean;
    imageUrl?: string | null;
    variants?: Array<{
      label: string;
      price?: number | null;
      currency?: string | null;
      available?: boolean;
      isSeasonal?: boolean;
    }>;
  };
  translatedName: string;
  categoryName: string;
  t: (key: string) => string;
  onEdit: () => void;
};

const FoodRow = ({
  food,
  translatedName,
  categoryName,
  t,
  onEdit,
}: FoodRowProps) => {
  const availabilityMutation = useFoodAvailabilityMutation(food.id);

  const handleToggle = () => {
    availabilityMutation.mutate(!food.available);
  };

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
            {food.imageUrl ? (
              <Image
                src={food.imageUrl}
                alt={translatedName}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs">
                No img
              </div>
            )}
          </div>
          <div
            className="font-semibold text-slate-900 dark:text-slate-100 truncate"
            title={translatedName}
          >
            {translatedName}
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 max-w-full">
          <span className="truncate">{categoryName}</span>
        </span>
      </td>
      <td className="px-3 py-4">
        <div className="flex flex-wrap gap-1.5">
          {food.variants && food.variants.length > 0 ? (
            food.variants.map((variant, idx) => (
              <React.Fragment key={idx}>
                {variant.isSeasonal ? (
                  <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium rounded truncate">
                    {t("seasonal")}
                  </span>
                ) : (
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
                    {variant.label && (
                      <span className="truncate">{variant.label}</span>
                    )}
                    {variant.price && (
                      <span className="font-semibold text-main dark:text-main whitespace-nowrap">
                        {variant.price} RM
                      </span>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <span className="text-slate-400 dark:text-slate-500">-</span>
          )}
        </div>
      </td>
      <td className="px-3 py-4 text-center">
        <div className="flex items-center justify-center">
          {food.available ? (
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40"
              title={t("available")}
            >
              <FiEye className="w-4 h-4 text-green-700 dark:text-green-300" />
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"
              title={t("unavailable")}
            >
              <FiEyeOff className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </div>
          )}
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg font-semibold text-sm transition-all shadow-sm bg-slate-600 dark:bg-slate-500 hover:bg-slate-700 dark:hover:bg-slate-400 text-white hover:shadow flex items-center justify-center"
            title="Edit"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggle}
            disabled={availabilityMutation.isPending}
            className={`p-2 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center ${
              food.available
                ? "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 hover:shadow"
                : "bg-green-500 hover:bg-green-600 text-white hover:shadow-md"
            }`}
            title={food.available ? t("lockItem") : t("unlockItem")}
          >
            {availabilityMutation.isPending ? (
              "..."
            ) : food.available ? (
              <FiEyeOff className="w-4 h-4" />
            ) : (
              <FiEye className="w-4 h-4" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FoodRow;
