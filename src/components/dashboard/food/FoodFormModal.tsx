"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Category } from "@prisma/client";
import { TranslatedFood } from "@/types/models/food";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

type Variant = {
  id?: string;
  label: string;
  price: number | null;
  currency: string;
  available: boolean;
  isSeasonal: boolean;
};

type FoodFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FoodFormData) => void;
  categories?: (Category & { translation?: Array<{ name: string }> })[];
  food?: TranslatedFood | null;
  isLoading?: boolean;
};

export type FoodFormData = {
  name: string;
  description?: string;
  categoryId: string;
  imageUrl?: string;
  available: boolean;
  variants: Variant[];
};

const FoodFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  food,
  isLoading,
}: FoodFormModalProps) => {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");

  const [formData, setFormData] = useState<FoodFormData>({
    name: "",
    description: "",
    categoryId: "",
    imageUrl: "",
    available: true,
    variants: [],
  });

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name,
        description: food.description || "",
        categoryId: food.categoryId,
        imageUrl: food.imageUrl || "",
        available: food.available,
        variants: food.variants
          ? food.variants.map((v) => ({
              id: v.id,
              label: v.label,
              price: v.price ?? null,
              currency: v.currency || "RM",
              available: v.available ?? true,
              isSeasonal: v.isSeasonal ?? false,
            }))
          : [],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        categoryId: "",
        imageUrl: "",
        available: true,
        variants: [],
      });
    }
  }, [food, isOpen]);

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          label: "",
          price: null,
          currency: "RM",
          available: true,
          isSeasonal: false,
        },
      ],
    });
  };

  const removeVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: string | number | boolean | null
  ) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {food ? t("editFood") : t("addFood")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* Food Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t("foodNameLabel")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("foodNamePlaceholder")}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t("descriptionLabel")}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder={t("descriptionPlaceholder")}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-main resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t("categoryLabel")} <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-main"
              >
                <option value="">{t("selectCategory")}</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.translation?.[0]?.name || category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t("imageUrlLabel")}
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                placeholder={t("imageUrlPlaceholder")}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>

            {/* Available */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="available"
                checked={formData.available}
                onChange={(e) =>
                  setFormData({ ...formData, available: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-main focus:ring-main"
              />
              <label
                htmlFor="available"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                {t("availableLabel")}
              </label>
            </div>

            {/* Variants Section */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t("variantsLabel") || "Variants"}
                </label>
                <button
                  type="button"
                  onClick={addVariant}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-main/10 hover:bg-main/20 text-main transition-colors"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                  {t("addVariant") || "Add Variant"}
                </button>
              </div>

              {formData.variants.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                  {t("noVariants") ||
                    "No variants added. Click 'Add Variant' to create pricing options."}
                </p>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {formData.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          {/* Label */}
                          <input
                            type="text"
                            value={variant.label}
                            onChange={(e) =>
                              updateVariant(index, "label", e.target.value)
                            }
                            placeholder="Size (e.g., S, L)"
                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                          />
                          {/* Price */}
                          <input
                            type="number"
                            step="0.01"
                            value={variant.price ?? ""}
                            onChange={(e) =>
                              updateVariant(
                                index,
                                "price",
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : null
                              )
                            }
                            placeholder="Price"
                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                          />
                          {/* Currency */}
                          <input
                            type="text"
                            value={variant.currency}
                            onChange={(e) =>
                              updateVariant(index, "currency", e.target.value)
                            }
                            placeholder="RM"
                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                          title="Remove variant"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <input
                            type="checkbox"
                            checked={variant.isSeasonal}
                            onChange={(e) =>
                              updateVariant(
                                index,
                                "isSeasonal",
                                e.target.checked
                              )
                            }
                            className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-main focus:ring-main"
                          />
                          {t("seasonal") || "Seasonal"}
                        </label>
                        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <input
                            type="checkbox"
                            checked={variant.available}
                            onChange={(e) =>
                              updateVariant(
                                index,
                                "available",
                                e.target.checked
                              )
                            }
                            className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-main focus:ring-main"
                          />
                          {t("available") || "Available"}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 px-6 pb-6 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors disabled:opacity-50"
            >
              {tCommon("cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-main hover:bg-main/90 text-white transition-colors disabled:opacity-50"
            >
              {isLoading ? "..." : tCommon("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodFormModal;
