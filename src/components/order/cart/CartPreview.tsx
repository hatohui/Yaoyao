import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
  const [width, setWidth] = useState<number>(384); // default width (w-96)
  const cartRef = useRef<HTMLDivElement | null>(null);
  const isResizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(384);

  useEffect(() => {
    if (cartRef.current) {
      gsap.fromTo(
        cartRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizingRef.current) return;
      const clientX = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;
      const dx = startXRef.current - clientX; // positive dx when dragging left
      const newWidth = Math.max(
        300,
        Math.min(window.innerWidth * 0.6, startWidthRef.current + dx)
      );
      setWidth(newWidth);
    };
    const onUp = () => {
      isResizingRef.current = false;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
    };
  }, []);
  const hasSeasonal = cart.some((item) => item.isSeasonal);
  const currency = cart?.[0]?.variantCurrency ?? "RM";

  return (
    <div
      ref={cartRef}
      className="hidden lg:block bg-slate-50 dark:bg-slate-900 p-6 xl:p-8 overflow-y-auto relative"
      style={{ width }}
    >
      {/* Resize handle */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize cart preview"
        className="absolute -left-2 top-0 bottom-0 w-3 cursor-ew-resize"
        onMouseDown={(e) => {
          isResizingRef.current = true;
          startXRef.current = e.clientX;
          startWidthRef.current = width;
        }}
        onTouchStart={(e) => {
          isResizingRef.current = true;
          startXRef.current = e.touches[0].clientX;
          startWidthRef.current = width;
        }}
      />
      {/* Make sure layout accounts for handle width */}
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
            <span className="text-main">
              {cartTotal.toFixed(2)} {currency}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPreview;
