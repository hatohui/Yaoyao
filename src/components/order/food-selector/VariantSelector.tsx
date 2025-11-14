import { FiPlus, FiMinus } from "react-icons/fi";

type Variant = {
  label: string;
  price?: number | null;
  currency?: string | null;
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
  notAvailableText,
}: VariantSelectorProps) => {
  const selectedVariantData =
    selectedVariant !== null ? variants[selectedVariant] : null;
  const isSelectedVariantAvailable = selectedVariantData?.available ?? true;

  return (
    <div className="border-t border-slate-200 dark:border-slate-700 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          {foodName}
        </h3>

        {variants.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <label className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide whitespace-nowrap">
              {selectVariantText}:
            </label>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectVariant(idx)}
                  disabled={!variant.available}
                  className={`px-4 py-2.5 rounded-lg border-2 transition-colors font-bold text-sm uppercase tracking-wide whitespace-nowrap cursor-pointer ${
                    selectedVariant === idx
                      ? "border-main dark:border-main bg-main text-white shadow-lg"
                      : variant.available
                      ? "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:border-main dark:hover:border-main hover:bg-slate-100 dark:hover:bg-slate-700"
                      : "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 opacity-60 cursor-not-allowed line-through"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{variant.label}</span>
                    {variant.price && !variant.isSeasonal && (
                      <span
                        className={`text-sm font-normal ${
                          selectedVariant === idx
                            ? "text-white/90"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        ({variant.price.toFixed(2)} {variant.currency || "RM"})
                      </span>
                    )}
                    {variant.isSeasonal && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                          selectedVariant === idx
                            ? "text-amber-300"
                            : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {seasonalText}
                      </span>
                    )}
                    {!variant.available && (
                      <span className="text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded font-semibold">
                        {notAvailableText}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <span className="text-base font-bold text-slate-700 dark:text-slate-300">
            {quantityText}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onQuantityChange(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            >
              <FiMinus className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            >
              <FiPlus className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
          </div>
        </div>

        <button
          onClick={onAddToCart}
          disabled={!isSelectedVariantAvailable}
          className="w-full mt-6 button text-base lg:text-lg font-bold py-3 lg:py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
        >
          <FiPlus className="w-5 h-5 inline mr-2" />
          {!isSelectedVariantAvailable ? notAvailableText : addToCartText}
        </button>
      </div>
    </div>
  );
};

export default VariantSelector;
