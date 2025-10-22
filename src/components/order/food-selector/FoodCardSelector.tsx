import Image from "next/image";
import { FiPackage } from "react-icons/fi";

type FoodCardSelectorProps = {
  food: {
    id: string;
    name: string;
    imageUrl: string | null;
    available: boolean;
    variants?: Array<{
      id: string;
      label: string;
      price?: number | null;
      isSeasonal?: boolean;
    }>;
  };
  isSelected: boolean;
  inCartCount: number;
  onSelect: () => void;
  unavailableText: string;
  seasonalText: string;
};

const FoodCardSelector = ({
  food,
  isSelected,
  inCartCount,
  onSelect,
  unavailableText,
  seasonalText,
}: FoodCardSelectorProps) => {
  const isAvailable = food.available;

  return (
    <button
      onClick={onSelect}
      disabled={!isAvailable}
      className={`relative text-left rounded-lg border-2 overflow-hidden transition-all ${
        isSelected
          ? "border-darkest dark:border-main shadow-lg ring-2 ring-darkest/20 dark:ring-main/20"
          : inCartCount > 0
          ? "border-main dark:border-main shadow-md ring-2 ring-main/20 dark:ring-main/30"
          : isAvailable
          ? "border-slate-200 dark:border-slate-700 hover:border-darkest/30 dark:hover:border-main/30 hover:shadow-md"
          : "border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed"
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
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-xs font-bold text-white px-2 py-1 bg-red-500 dark:bg-red-600 rounded">
              {unavailableText}
            </span>
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
              )} RM`}</span>
            )}
          </p>
        )}
      </div>
    </button>
  );
};

export default FoodCardSelector;
