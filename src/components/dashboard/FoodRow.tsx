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
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-semibold text-slate-900 dark:text-slate-100">
          {translatedName}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
          {categoryName}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          {food.variants && food.variants.length > 0 ? (
            <div className="space-y-2">
              {food.variants.map((variant, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-700/30"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {variant.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {variant.price && (
                      <span className="font-semibold text-main dark:text-main">
                        {variant.price} RM
                      </span>
                    )}
                    {variant.available ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                        <FiEye className="w-3 h-3" />
                        {t("available")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium rounded">
                        <FiEyeOff className="w-3 h-3" />
                        {t("unavailable")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-500">-</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        {food.available ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full">
            <FiEye className="w-4 h-4" />
            {t("available")}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold rounded-full">
            <FiEyeOff className="w-4 h-4" />
            {t("unavailable")}
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={handleToggle}
          disabled={availabilityMutation.isPending}
          className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
            food.available
              ? "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 hover:shadow"
              : "bg-green-500 hover:bg-green-600 text-white hover:shadow-md"
          }`}
        >
          {availabilityMutation.isPending ? (
            "..."
          ) : food.available ? (
            <>
              <FiEyeOff className="inline w-4 h-4 mr-1.5" />
              {t("hideItem")}
            </>
          ) : (
            <>
              <FiEye className="inline w-4 h-4 mr-1.5" />
              {t("showItem")}
            </>
          )}
        </button>
      </td>
    </tr>
  );
};

export default FoodRow;
