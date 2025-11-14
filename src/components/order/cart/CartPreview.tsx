import { FiShoppingCart } from "react-icons/fi";
import { CartItem as CartItemType } from "@/hooks/order/useFoodCart";
import CartItem from "./CartItem";

type CartPreviewProps = {
  cart: CartItemType[];
  cartItemCount: number;
  cartTotal: number;
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  cartText: string;
  itemText: string;
  itemsText: string;
  emptyCartText: string;
  totalText: string;
  seasonalText: string;
  seasonalWarningText: string;
};

const CartPreview = ({
  cart,
  cartItemCount,
  cartTotal,
  onRemoveItem,
  onUpdateQuantity,
  cartText,
  itemText,
  itemsText,
  emptyCartText,
  totalText,
  seasonalText,
  seasonalWarningText,
}: CartPreviewProps) => {
  const hasSeasonal = cart.some((item) => item.isSeasonal);

  return (
    <div className="hidden lg:block w-96 xl:w-[28rem] bg-slate-50 dark:bg-slate-900 p-6 xl:p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {cartText}
        </h3>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
          {cartItemCount} {cartItemCount === 1 ? itemText : itemsText}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <FiShoppingCart className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {emptyCartText}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              onRemove={() => onRemoveItem(index)}
              onUpdateQuantity={(delta) => onUpdateQuantity(index, delta)}
              seasonalText={seasonalText}
            />
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-300 dark:border-slate-700">
          {hasSeasonal && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <span className="text-base">⚠️</span>
              <span>{seasonalWarningText}</span>
            </p>
          )}
          <div className="flex items-center justify-between text-xl font-bold">
            <span className="text-slate-900 dark:text-slate-100">
              {totalText}
            </span>
            <span className="text-main">{cartTotal.toFixed(2)} RM</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPreview;
