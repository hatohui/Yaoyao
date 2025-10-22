import { FiPlus, FiMinus } from "react-icons/fi";

type Variant = {
  label: string;
  price?: number | null;
  available?: boolean;
  isSeasonal?: boolean;
};

type VariantSelectorProps = {
  foodName: string;
  variants: Variant[];
  selectedVariant: number | null;
  quantity: number;
  onSelectVariant: (index: number) => void;
  onQuantityChange: (delta: number) => void;
  onAddToCart: () => void;
  selectVariantText: string;
  quantityText: string;
  addToCartText: string;
  seasonalText: string;
  priceText: string;
  notAvailableText: string;
};

const VariantSelector = ({
  foodName,
  variants,
  selectedVariant,
  quantity,
  onSelectVariant,
  onQuantityChange,
  onAddToCart,
  selectVariantText,
  quantityText,
  addToCartText,
  seasonalText,
  priceText,
  notAvailableText,
}: VariantSelectorProps) => {
  return (
    <div className="border-t border-slate-200 dark:border-slate-700 p-3 md:p-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
          {foodName}
        </h3>

        {variants.length > 0 && (
          <div className="space-y-3">
            <label className="text-xs md:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              {selectVariantText}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectVariant(idx)}
                  disabled={!variant.available}
                  className={`p-3 md:p-4 rounded-lg border-2 text-left transition-all relative ${
                    selectedVariant === idx
                      ? "border-main dark:border-main bg-main/10 dark:bg-main/20 shadow-lg ring-2 ring-main/30 dark:ring-main/40"
                      : variant.available
                      ? "border-slate-300 dark:border-slate-600 hover:border-main/50 dark:hover:border-main/50 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      : "border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed"
                  }`}
                >
                  {selectedVariant === idx && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-main rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`text-sm md:text-base font-bold uppercase tracking-wide ${
                          selectedVariant === idx
                            ? "text-main dark:text-main"
                            : "text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        {variant.label}
                      </div>
                      {variant.isSeasonal && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded font-semibold whitespace-nowrap">
                          {seasonalText}
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-xs md:text-sm font-bold ${
                        selectedVariant === idx
                          ? "text-main dark:text-main"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {variant.isSeasonal ? (
                        <span className="text-amber-600 dark:text-amber-400">
                          ({seasonalText} {priceText})
                        </span>
                      ) : (
                        `${variant.price?.toFixed(2)} RM`
                      )}
                    </div>
                  </div>
                  {!variant.available && (
                    <div className="text-xs text-red-600 dark:text-red-400 mt-1 font-semibold">
                      {notAvailableText}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {quantityText}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuantityChange(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <FiMinus className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            </button>
            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <FiPlus className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            </button>
          </div>
        </div>

        <button
          onClick={onAddToCart}
          className="w-full mt-4 bg-darkest dark:bg-slate-700 hover:bg-darkest/90 dark:hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all text-sm md:text-base"
        >
          <FiPlus className="w-4 h-4 inline mr-2" />
          {addToCartText}
        </button>
      </div>
    </div>
  );
};

export default VariantSelector;
