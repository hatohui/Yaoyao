import useFoods from "@/hooks/useFoods";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export type FoodGalleryProps = {
  className?: string;
  category?: string | null;
};

const FoodGallery = ({ className, category }: FoodGalleryProps) => {
  const { data: foods, isLoading } = useFoods(category);
  const t = useTranslations("menu");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!foods || foods.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          {t("noFoodsTitle")}
        </h3>
        <p className="text-slate-600">{t("noFoodsMessage")}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {category ? t("categoryMenu") : t("allMenu")}
        </h2>
        <span className="text-sm text-slate-600">
          {foods.length} {foods.length === 1 ? t("dish") : t("dishes")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {foods.map((food) => {
          // Get translated name and description if available
          const translatedName = food.translations?.[0]?.name || food.name;
          const translatedDescription =
            food.translations?.[0]?.description || food.description;

          return (
            <div
              key={food.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-slate-200"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-100">
                {food.imageUrl ? (
                  <Image
                    src={food.imageUrl}
                    alt={translatedName}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  // Fallback placeholder
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                )}
                {/* Availability Badge */}
                {!food.available && (
                  <div className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    {t("unavailable")}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                  {translatedName}
                </h3>
                {translatedDescription && (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {translatedDescription}
                  </p>
                )}

                {/* Variants/Prices */}
                {food.variants && food.variants.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    {food.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-700 font-medium">
                          {variant.label || t("price")}:
                        </span>
                        <div className="flex items-center gap-2">
                          {variant.price && (
                            <span className="font-semibold text-slate-900">
                              {variant.price} {variant.currency}
                            </span>
                          )}
                          {variant.isSeasonal && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              {t("seasonal")}
                            </span>
                          )}
                          {!variant.available && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                              {t("unavailable")}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodGallery;
