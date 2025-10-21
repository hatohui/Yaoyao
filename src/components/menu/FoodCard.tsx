"use client";
import Image from "next/image";
import { FiImage, FiCheck, FiLink } from "react-icons/fi";
import { useCopyToClipboard } from "@/hooks/common/useCopyToClipboard";
import { useSearchParams } from "next/navigation";
import { mergeQueryParams } from "@/utils/mergeQueryParams";

type FoodCardProps = {
  food: {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    available: boolean;
    variants?: Array<{
      label: string;
      price?: number | null;
      currency?: string | null;
      isSeasonal?: boolean;
      available?: boolean;
    }>;
  };
  translatedName: string;
  translatedDescription?: string | null;
  t: (key: string) => string;
};

const FoodCard = ({
  food,
  translatedName,
  translatedDescription,
  t,
}: FoodCardProps) => {
  const isUnavailable = !food.available;
  const { copied, copyToClipboard } = useCopyToClipboard();
  const searchParams = useSearchParams();

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Generate URL with preserved query params (especially lang)
    const queryString = mergeQueryParams(searchParams, {});
    const foodUrl = `${
      typeof window !== "undefined" ? window.location.origin : ""
    }/menu/${food.id}${queryString ? `?${queryString}` : ""}`;

    await copyToClipboard(foodUrl);
  };

  return (
    <div
      onClick={handleCopyLink}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const syntheticEvent = {
            preventDefault: () => {},
          } as React.MouseEvent;
          handleCopyLink(syntheticEvent);
        }
      }}
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-main/10 dark:border-slate-700 hover:border-main/30 dark:hover:border-main/50 relative group ${
        isUnavailable ? "opacity-60 grayscale" : ""
      }`}
    >
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600">
        {food.imageUrl ? (
          <Image
            src={food.imageUrl}
            alt={translatedName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover ${isUnavailable ? "opacity-50" : ""}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiImage className="w-20 h-20 text-slate-300 dark:text-slate-500" />
          </div>
        )}

        {/* Copy Link Indicator - Shows on hover and when copied */}
        <div
          className={`absolute top-2 left-2 px-3 py-1 text-white text-xs font-semibold rounded-full shadow-lg transition-all ${
            copied
              ? "bg-green-500 dark:bg-green-600 opacity-100"
              : "bg-main/80 dark:bg-main/70 opacity-0 group-hover:opacity-100"
          }`}
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <FiCheck className="w-3 h-3" />
              {t("linkCopied")}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FiLink className="w-3 h-3" />
              {t("clickToCopyLink")}
            </span>
          )}
        </div>

        {/* Availability Badge */}
        {isUnavailable && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-red-500 dark:bg-red-600 text-white text-xs font-semibold rounded-full shadow-lg">
            {t("unavailable")}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3
          className={`text-base sm:text-lg font-bold mb-2 line-clamp-2 ${
            isUnavailable
              ? "text-slate-500 dark:text-slate-400"
              : "text-slate-900 dark:text-slate-100"
          }`}
        >
          {translatedName}
        </h3>
        {translatedDescription && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
            {translatedDescription}
          </p>
        )}

        {/* Variants/Prices */}
        {food.variants && food.variants.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-main/10 dark:border-slate-700 mt-auto">
            {food.variants.map((variant, index: number) => (
              <div
                key={index}
                className="flex items-start justify-between gap-2 text-sm"
              >
                <span className="text-darkest dark:text-slate-300 font-medium flex-shrink-0 min-w-0">
                  {variant.label || t("price")}:
                </span>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {variant.price && (
                    <span className="font-semibold text-main dark:text-main whitespace-nowrap">
                      {variant.price} {variant.currency || "RM"}
                    </span>
                  )}
                  <div className="flex gap-1 flex-wrap justify-end">
                    {variant.isSeasonal && (
                      <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium rounded whitespace-nowrap">
                        {t("seasonal")}
                      </span>
                    )}
                    {!variant.available && (
                      <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium rounded whitespace-nowrap">
                        {t("unavailable")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
