import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

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
  onClose?: () => void;
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
  onClose,
}: VariantSelectorProps) => {
  const selectedVariantData =
    selectedVariant !== null ? variants[selectedVariant] : null;
  const isSelectedVariantAvailable = selectedVariantData?.available ?? true;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const animateClose = React.useCallback(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (onClose) onClose();
        },
      });
    } else {
      if (onClose) onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        animateClose();
      }
      if (e.key === "Tab") {
        // focus trap
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, animateClose]);

  useEffect(() => {
    // animate in
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
    // save focus and focus close button
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    setTimeout(() => closeButtonRef.current?.focus(), 50);
    return () => {
      previouslyFocusedRef.current?.focus?.();
    };
  }, []);

  const [announce, setAnnounce] = React.useState("");

  const handleAddClick = () => {
    try {
      onAddToCart();
      const variantLabel = selectedVariantData?.label || "";
      setAnnounce(`${quantity} x ${variantLabel || foodName} added to cart`);
      animateClose();
    } catch (e) {
      console.error(e);
      setAnnounce("Failed to add to cart");
    }
  };

  React.useEffect(() => {
    if (!announce) return;
    const t = setTimeout(() => setAnnounce(""), 2500);
    return () => clearTimeout(t);
  }, [announce]);

  // fixed footer height

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // prevent body scroll while the portal overlay is active on mobile
  useEffect(() => {
    if (!isMobile) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      // restore previous value
      document.body.style.overflow = prevOverflow || "";
    };
  }, [isMobile]);

  const variantPanelJSX = (
    <div className="fixed left-0 right-0 bottom-0 z-50 lg:absolute lg:left-0 lg:right-0 lg:bottom-0 lg:h-56 pointer-events-auto">
      <div
        role="dialog"
        ref={panelRef}
        aria-modal="true"
        className="origin-bottom bg-slate-50 dark:bg-slate-900 shadow-xl rounded-t-lg lg:rounded-lg border-t lg:border lg:border-slate-200 dark:border-slate-700 overflow-hidden w-full lg:w-full p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto relative">
          {/* aria-live for screen readers */}
          <div className="sr-only" aria-live="polite">
            {announce}
          </div>
          <button
            aria-label="Close variant selector"
            ref={closeButtonRef}
            onClick={() => animateClose()}
            className="absolute right-3 top-3 z-60 p-3 bg-slate-50/80 dark:bg-slate-900/50 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full shadow-md"
          >
            <FiX className="w-5 h-5" />
          </button>
          <div className="overflow-y-auto max-h-[calc(100vh-3.5rem)] lg:max-h-none lg:h-[14rem] pt-8 p-2 lg:p-4 pb-6 lg:pb-4">
            {/* top separator used to drag/resize removed (fixed height) */}

            <h3 className="text-sm lg:text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 tracking-wide">
              {foodName}
            </h3>

            {/* Content */}
            {/* Variants */}
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
                      className={`px-3 h-8 sm:h-9 min-w-[3.25rem] sm:min-w-[3.5rem] rounded-md border transition-colors font-semibold uppercase tracking-wide whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-main ${
                        selectedVariant === idx
                          ? "border-main bg-main text-white shadow"
                          : variant.available
                          ? "border-slate-300 text-slate-900 dark:text-slate-100 cursor-pointer"
                          : "border-slate-200 text-slate-400 opacity-40 line-through cursor-not-allowed"
                      }`}
                      aria-pressed={selectedVariant === idx}
                      aria-disabled={!variant.available}
                    >
                      <div className="flex items-center gap-2 h-full">
                        <span className="truncate max-w-[8rem] block">
                          <span
                            className={`leading-none ${
                              selectedVariant === idx
                                ? "text-sm font-bold"
                                : "text-xs"
                            }`}
                          >
                            {variant.label}
                          </span>
                        </span>
                        {variant.price !== null &&
                          variant.price !== undefined &&
                          !variant.isSeasonal && (
                            <span
                              className={`text-xs ${
                                selectedVariant === idx
                                  ? "text-white/90"
                                  : "text-slate-500 dark:text-slate-400"
                              }`}
                              aria-hidden
                            >
                              ({variant.price.toFixed(2)}{" "}
                              {variant.currency || "RM"})
                            </span>
                          )}
                        {variant.isSeasonal && (
                          <span className="inline-flex items-center text-xs px-1 py-0.5 rounded-full font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 ml-1">
                            {seasonalText}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & add */}
            <div className="mt-4 flex items-center justify-between bg-white dark:bg-slate-800 rounded-md p-3 border border-slate-200 dark:border-slate-700 text-sm">
              <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                {quantityText}
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ${
                    quantity <= 1
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>
                <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => onQuantityChange(1)}
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddClick}
              disabled={!isSelectedVariantAvailable}
              className="w-full mt-4 button text-sm font-bold py-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
              aria-disabled={!isSelectedVariantAvailable}
            >
              <FiPlus className="w-5 h-5 inline mr-2" />
              {!isSelectedVariantAvailable ? notAvailableText : addToCartText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile && typeof document !== "undefined") {
    return createPortal(variantPanelJSX, document.body);
  }
  return variantPanelJSX;
};

export default VariantSelector;
