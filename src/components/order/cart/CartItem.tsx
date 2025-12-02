import Image from "next/image";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";
import { CartItem as CartItemType } from "@/hooks/order/useFoodCart";

type CartItemProps = {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (delta: number) => void;
  seasonalText: string;
};

const CartItem = ({
  item,
  onRemove,
  onUpdateQuantity,
  seasonalText,
}: CartItemProps) => {
  const currency = item.variantCurrency ?? "RM";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
      <div className="flex gap-2">
        {item.foodImage && (
          <div className="relative w-12 h-12 flex-shrink-0 rounded bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <Image
              src={item.foodImage}
              alt={item.foodName}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
              {item.foodName}
            </h4>
            {item.isSeasonal && (
              <span className="flex-shrink-0 text-[9px] px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded font-semibold">
                {seasonalText}
              </span>
            )}
          </div>
          {item.variantLabel && (
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {item.variantLabel}
            </p>
          )}
          <p className="text-xs font-semibold text-main mt-1">
            {item.isSeasonal ? (
              <span className="text-amber-600 dark:text-amber-400">
                Market Price
              </span>
            ) : (
              <>
                {(item.variantPrice * item.quantity).toFixed(2)} {currency}
              </>
            )}
          </p>
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded p-1 transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onUpdateQuantity(-1)}
            disabled={item.quantity <= 1}
            className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
          >
            <FiMinus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-xs font-medium text-slate-900 dark:text-slate-100">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(1)}
            disabled={false}
            className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            <FiPlus className="w-3 h-3" />
          </button>
        </div>
        {!item.isSeasonal && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {item.variantPrice.toFixed(2)} {currency} × {item.quantity}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartItem;
