"use client";
import { PresetMenu, Food, FoodVariant } from "@prisma/client";
import { FiTrash2, FiPackage } from "react-icons/fi";
import Image from "next/image";
import { useTranslations } from "next-intl";

type PresetMenuTableProps = {
  presetMenus: (PresetMenu & {
    food: Food;
    variant: FoodVariant | null;
  })[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

const PresetMenuTable = ({
  presetMenus,
  onDelete,
  isDeleting,
}: PresetMenuTableProps) => {
  const t = useTranslations("presetMenu");
  const tMenu = useTranslations("menu");

  if (presetMenus.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
            <FiPackage className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-2">
            {t("noPresetItems")}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("noPresetItemsMessage")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("food")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("variant")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("quantity")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("price")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("total")}
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {presetMenus.map((preset) => {
              const price = preset.variant?.price ?? 0;
              const total = price * preset.quantity;

              return (
                <tr
                  key={preset.id}
                  className="hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 border-2 border-yellow-400 dark:border-yellow-600">
                        {preset.food.imageUrl ? (
                          <Image
                            src={preset.food.imageUrl}
                            alt={preset.food.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiPackage className="w-5 h-5 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {preset.food.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {preset.food.available ? (
                            <span className="text-green-600 dark:text-green-400">
                              {tMenu("available")}
                            </span>
                          ) : (
                            <span className="text-red-600 dark:text-red-400">
                              {tMenu("unavailable")}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      {preset.variant?.label || t("defaultVariant")}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {preset.quantity}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100">
                      {price.toFixed(2)} {preset.variant?.currency || "RM"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-main dark:text-main">
                      {total.toFixed(2)} {preset.variant?.currency || "RM"}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onDelete(preset.id)}
                      disabled={isDeleting}
                      className="inline-flex items-center justify-center p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      aria-label="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-700">
        {presetMenus.map((preset) => {
          const price = preset.variant?.price ?? 0;
          const total = price * preset.quantity;

          return (
            <div
              key={preset.id}
              className="p-4 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 border-2 border-yellow-400 dark:border-yellow-600">
                  {preset.food.imageUrl ? (
                    <Image
                      src={preset.food.imageUrl}
                      alt={preset.food.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiPackage className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {preset.food.name}
                  </h3>
                  {preset.variant && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {preset.variant.label}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Qty: {preset.quantity}
                    </span>
                    <span className="text-xs font-medium text-main dark:text-main">
                      {total.toFixed(2)} {preset.variant?.currency || "RM"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(preset.id)}
                  disabled={isDeleting}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                  aria-label="Delete"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PresetMenuTable;
