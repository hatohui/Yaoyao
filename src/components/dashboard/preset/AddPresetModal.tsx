"use client";
import React, { useState, useEffect } from "react";
import { FiX, FiSearch, FiPackage, FiCheck } from "react-icons/fi";
import { TranslatedFood } from "@/types/models/food";
import Image from "next/image";
import { Category } from "@prisma/client";
import { useTranslations } from "next-intl";

type AddPresetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    foodId: string;
    variantId?: string;
    quantity: number;
  }) => void;
  foods?: TranslatedFood[];
  categories?: (Category & { translation?: Array<{ name: string }> })[];
  isLoading: boolean;
};

const AddPresetModal = ({
  isOpen,
  onClose,
  foods = [],
  onSubmit,
  isLoading,
}: AddPresetModalProps) => {
  const t = useTranslations("presetMenu");
  const tCommon = useTranslations("common");
  const tMenu = useTranslations("menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<TranslatedFood | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setSearchQuery("");
      setSelectedFood(null);
      setSelectedVariantId("");
      setQuantity(1);
      setSelectedCategory(null);
    }
  }, [isOpen]);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || food.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFoodSelect = (food: TranslatedFood) => {
    setSelectedFood(food);
    setSelectedVariantId("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFood) return;

    onSubmit({
      foodId: selectedFood.id,
      variantId: selectedVariantId || undefined,
      quantity,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-slate-900/75 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Center modal */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal */}
        <div className="relative inline-block w-full max-w-4xl p-6 my-8 text-left align-middle transition-all transform bg-white dark:bg-slate-800 shadow-xl rounded-2xl z-10 max-h-[90vh]">
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t("addToPresetMenu")}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {selectedFood ? (
              /* Configuration View */
              <form
                onSubmit={handleSubmit}
                className="flex flex-col flex-1 min-h-0"
              >
                {/* Selected Food Info */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4 flex-shrink-0">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                      {selectedFood.imageUrl ? (
                        <Image
                          src={selectedFood.imageUrl}
                          alt={selectedFood.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiPackage className="w-8 h-8 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {selectedFood.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {selectedFood.available ? (
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
                    <button
                      type="button"
                      onClick={() => setSelectedFood(null)}
                      className="text-sm text-main hover:text-main/80 font-medium"
                    >
                      {t("change")}
                    </button>
                  </div>
                </div>

                {/* Configuration Form */}
                <div className="space-y-4 flex-shrink-0">
                  {/* Variant Selection */}
                  {selectedFood.variants &&
                    selectedFood.variants.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {t("variantLabel")}
                        </label>
                        <select
                          value={selectedVariantId}
                          onChange={(e) => setSelectedVariantId(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-main focus:border-transparent"
                        >
                          <option value="">{t("selectDefaultVariant")}</option>
                          {selectedFood.variants.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                              {variant.label} - {variant.price}{" "}
                              {variant.currency}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {t("quantityLabel")} *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      required
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-main focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-6 mt-auto flex-shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                  >
                    {tCommon("cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-main hover:bg-main/90 text-white rounded-lg disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? t("adding") : t("addToPreset")}
                  </button>
                </div>
              </form>
            ) : (
              /* Food Selection Gallery */
              <>
                {/* Search Bar */}
                <div className="mb-4 flex-shrink-0">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t("searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-main focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Food Gallery */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  {filteredFoods.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <FiPackage className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
                      <p className="text-slate-600 dark:text-slate-400">
                        {t("noFoodFound")}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-4">
                      {filteredFoods.map((food) => (
                        <button
                          key={food.id}
                          type="button"
                          onClick={() => handleFoodSelect(food)}
                          className="group relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-main dark:hover:border-main rounded-lg overflow-hidden transition-all hover:shadow-lg"
                        >
                          {/* Image */}
                          <div className="relative aspect-square bg-slate-100 dark:bg-slate-800">
                            {food.imageUrl ? (
                              <Image
                                src={food.imageUrl}
                                alt={food.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FiPackage className="w-12 h-12 text-slate-400" />
                              </div>
                            )}
                            {/* Availability Badge */}
                            {!food.available && (
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                N/A
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-main transition-colors">
                              {food.name}
                            </h4>
                            {food.variants && food.variants.length > 0 && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {food.variants.length}{" "}
                                {food.variants.length === 1
                                  ? t("variantCount")
                                  : t("variantsCount")}
                              </p>
                            )}
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-main/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-main text-white rounded-full p-2">
                              <FiCheck className="w-6 h-6" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cancel Button */}
                <div className="flex justify-end pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    {tCommon("cancel")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPresetModal;
