import { GetFoodsResponse } from "@/types/api/food/GET";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FiPackage } from "react-icons/fi";

type FoodCardSelectorProps = {
  food: GetFoodsResponse["foods"][number];
  isSelected: boolean;
  inCartCount: number;
  onSelect: () => void;
  seasonalText: string;
  isPreset?: boolean;
  presetText?: string;
};

const FoodCardSelector = ({
  food,
  isSelected,
  inCartCount,
  onSelect,
  seasonalText,
  isPreset = false,
  presetText = "Preset",
}: FoodCardSelectorProps) => {
  const tPreset = useTranslations("presetMenu");

  return (
    <button
      onClick={onSelect}
      className={`relative text-left cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${
        isSelected
          ? "border-darkest dark:border-main shadow-lg ring-2 ring-darkest/20 dark:ring-main/20"
          : inCartCount > 0
          ? "border-main dark:border-main shadow-md ring-2 ring-main/20 dark:ring-main/30"
          : "border-slate-200 dark:border-slate-700 hover:border-darkest/30 dark:hover:border-main/30 hover:shadow-md"
      }`}
    >
      {inCartCount > 0 && (
        <div className="absolute top-2 right-2 z-10 bg-main text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
          {inCartCount}
        </div>
      )}

      <div className="relative h-28 bg-slate-100 dark:bg-slate-700">
        {food.imageUrl ? (
          <Image
            src={food.imageUrl}
            alt={food.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiPackage className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
        )}

        {isPreset && (
          <div
            className="absolute left-2 top-2 px-2 py-0.5 bg-purple-600 text-white text-[10px] font-semibold rounded-md"
            aria-label={presetText}
          >
            {presetText || tPreset("presetItem")}
          </div>
        )}
      </div>
      <div className="p-2 bg-white dark:bg-slate-800">
        <div className="bg-slate-50 dark:bg-slate-700/50 px-2 py-1.5 rounded mb-1">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate uppercase tracking-wide">
            {food.name}
          </h3>
        </div>
        {food.variants && food.variants.length > 0 && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 px-1">
            {food.variants[0].isSeasonal ? (
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                ({seasonalText})
              </span>
            ) : (
              <span className="font-semibold">{`${food.variants[0].price?.toFixed(
                2
              )} ${food.variants[0].currency || "RM"}`}</span>
            )}
          </p>
        )}
      </div>
    </button>
  );
};

export default FoodCardSelector;
