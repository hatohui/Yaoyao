"use client";
import { useFoodAvailabilityMutation } from "@/hooks/food/useFoodAvailabilityMutation";
import { FiEye, FiEyeOff } from "react-icons/fi";

type FoodRowProps = {
  food: {
    id: string;
    name: string;
    available: boolean;
    variants?: Array<{
      label: string;
      price?: number | null;
      currency?: string | null;
      available?: boolean;
    }>;
  };
  translatedName: string;
  categoryName: string;
  t: (key: string) => string;
};

const FoodRow = ({ food, translatedName, categoryName, t }: FoodRowProps) => {
  const availabilityMutation = useFoodAvailabilityMutation(food.id);

  const handleToggle = () => {
    availabilityMutation.mutate(!food.available);
  };

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
      <td className="px-4 py-4">
        <div className="font-medium text-slate-900 dark:text-slate-100">
          {translatedName}
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {categoryName}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {food.variants && food.variants.length > 0 ? (
            <div className="space-y-1">
              {food.variants.map((variant, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span>{variant.label}</span>
                  {variant.price && (
                    <span className="font-medium text-main dark:text-main">
                      {variant.price} RM
                    </span>
                  )}
                  {!variant.available && (
                    <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs rounded">
                      {t("unavailable")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            "-"
          )}
        </div>
      </td>
      <td className="px-4 py-4 text-center">
        {food.available ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
            <FiEye className="w-4 h-4" />
            {t("available")}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-full">
            <FiEyeOff className="w-4 h-4" />
            {t("unavailable")}
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-center">
        <button
          onClick={handleToggle}
          disabled={availabilityMutation.isPending}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            food.available
              ? "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {availabilityMutation.isPending
            ? "..."
            : food.available
            ? t("unavailable") // Button to make unavailable
            : t("available")}{" "}
          {/* Button to make available */}
        </button>
      </td>
    </tr>
  );
};

export default FoodRow;
