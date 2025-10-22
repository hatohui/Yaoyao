"use client";
import { useTranslations } from "next-intl";

type Variant = {
  id: string;
  label: string;
  price?: number | null;
  currency?: string | null;
  isSeasonal?: boolean;
  available?: boolean;
};

type FoodDetailInfoProps = {
  description?: string | null;
  variants?: Variant[];
};

const FoodDetailInfo = ({ description, variants }: FoodDetailInfoProps) => {
  const t = useTranslations("menu");

  return (
    <div className="space-y-4">
      {/* Description Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
          {t("description")}
        </h2>
        {description ? (
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
            {description}
          </p>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 italic text-sm">
            {t("noDescription")}
          </p>
        )}
      </div>

      {/* Variants/Prices Section */}
      {variants && variants.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
            {t("price")}
          </h2>
          <div className="space-y-2">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-200">
                    {variant.label}
                  </h3>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {variant.isSeasonal && (
                      <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                        {t("seasonal")}
                      </span>
                    )}
                    {!variant.available && (
                      <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium rounded">
                        {t("unavailable")}
                      </span>
                    )}
                  </div>
                </div>
                {variant.price && (
                  <div className="text-right">
                    <p className="text-lg sm:text-xl font-bold text-main dark:text-main">
                      {variant.price} {variant.currency || "RM"}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetailInfo;
