"use client";
import useFoods from "@/hooks/food/useFoods";
import useCategories from "@/hooks/food/useCategories";
import { useAddOrder } from "@/hooks/order/useOrderMutation";
import { useFoodCart } from "@/hooks/order/useFoodCart";
import { useDebouncedSearch } from "@/hooks/common/useDebouncedSearch";
import { filterBySearch } from "@/utils/filterBySearch";
import { useTranslations } from "next-intl";
import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import gsap from "gsap";
import CategorySelector from "../../food/CategorySelector";
import FoodCardSelector from "./FoodCardSelector";
import CartPreview from "../cart/CartPreview";
import FoodSelectorSearch from "./FoodSelectorSearch";
import VariantSelector from "./VariantSelector";
import Pagination from "../../common/Pagination";

type FoodSelectorProps = {
  tableId: string;
};

const FoodSelector = ({ tableId }: FoodSelectorProps) => {
  const t = useTranslations("orders");
  const tMenu = useTranslations("menu");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { searchInput, setSearchInput, debouncedSearch } = useDebouncedSearch();
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: categories } = useCategories();
  const { data: foodsData, isLoading } = useFoods({
    category: selectedCategory,
    page: currentPage,
    search: debouncedSearch,
    count: 9,
  });
  const addOrderMutation = useAddOrder(tableId);

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  } = useFoodCart();

  const foods = foodsData?.foods || [];
  const filteredFoods = filterBySearch(foods, debouncedSearch, ["name"]);
  const selectedFoodData = foods.find((f) => f.id === selectedFood);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearch]);

  // Animate modal open/close
  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.2)" }
      );
    }
  }, [isOpen]);

  // Add item to cart
  const handleAddToCart = () => {
    if (!selectedFood || !selectedFoodData) return;

    if (selectedFoodData.variants && selectedFoodData.variants.length > 0) {
      if (selectedVariant === null) {
        alert(t("selectVariantPrompt"));
        return;
      }
    }

    const variant =
      selectedFoodData.variants && selectedFoodData.variants.length > 0
        ? selectedVariant !== null
          ? selectedFoodData.variants[selectedVariant]
          : selectedFoodData.variants[0]
        : null;

    addToCart(
      {
        foodId: selectedFood,
        foodName: selectedFoodData.name,
        foodImage: selectedFoodData.imageUrl,
        variantId: variant?.id,
        variantLabel: variant?.label,
        variantPrice: variant?.price ?? 0,
        isSeasonal: variant?.isSeasonal ?? false,
      },
      quantityToAdd
    );

    setSelectedFood(null);
    setSelectedVariant(null);
    setQuantityToAdd(1);
  };

  // Submit all cart items
  const handleSubmitCart = async () => {
    if (cart.length === 0) return;

    try {
      for (const item of cart) {
        await addOrderMutation.mutateAsync({
          foodId: item.foodId,
          variantId: item.variantId,
          quantity: item.quantity,
        });
      }
      clearCart();
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting orders:", error);
    }
  };

  // Close modal with animation
  const handleCloseModal = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.95,
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setIsOpen(false);
          clearCart();
        },
      });
    } else {
      setIsOpen(false);
      clearCart();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button onClick={() => setIsOpen(true)} className="block w-full button">
        <div className="flex items-center justify-center gap-2 relative">
          <FiPlus className="w-5 h-5" />
          <span className="text-sm dark:text-slate-100">{t("orderFood")}</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex h-screen items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            ref={contentRef}
            className="bg-white dark:bg-slate-800 md:rounded-xl shadow-2xl w-full h-full md:max-w-6xl md:max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-darkest dark:bg-slate-900 px-4 md:px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <h2 className="text-base md:text-lg font-semibold text-white dark:text-slate-100">
                  {t("selectFood")}
                </h2>
                {cartItemCount > 0 && (
                  <span className="bg-main text-white text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
                    {cartItemCount}{" "}
                    {cartItemCount === 1 ? t("item") : t("items")}
                  </span>
                )}
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white/80 dark:text-slate-300 hover:text-white dark:hover:text-white transition-colors p-1"
              >
                <FiX className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Search and Categories */}
            <div className="border-b border-slate-200 dark:border-slate-700 p-3 md:p-4 space-y-3 flex-shrink-0">
              <FoodSelectorSearch
                value={searchInput}
                onChange={setSearchInput}
                placeholder={tMenu("searchPlaceholder")}
              />
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            {/* Food Grid and Cart Split View */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0">
              {/* Left: Food Grid */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:border-r border-slate-200 dark:border-slate-700">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
                    <span className="ml-3 text-slate-600 dark:text-slate-400 text-sm">
                      {tMenu("loading")}
                    </span>
                  </div>
                ) : filteredFoods && filteredFoods.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-3">
                      {filteredFoods.map((food) => {
                        const inCartCount =
                          food.variants?.reduce((sum, variant) => {
                            return sum + getCartQuantity(food.id, variant.id);
                          }, 0) || 0;

                        return (
                          <FoodCardSelector
                            key={food.id}
                            food={food}
                            isSelected={selectedFood === food.id}
                            inCartCount={inCartCount}
                            onSelect={() => {
                              if (!food.available) return;
                              setSelectedFood(food.id);
                              setSelectedVariant(
                                food.variants && food.variants.length > 0
                                  ? 0
                                  : null
                              );
                            }}
                            unavailableText={tMenu("unavailable")}
                            seasonalText={tMenu("seasonal")}
                          />
                        );
                      })}
                    </div>
                    {foodsData && foodsData.pagination.totalPages > 1 && (
                      <Pagination
                        currentPage={foodsData.pagination.page}
                        totalPages={foodsData.pagination.totalPages}
                        onPageChange={setCurrentPage}
                        className="mt-4"
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400">
                      {tMenu("noFoodsMessage")}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Cart Preview */}
              <CartPreview
                cart={cart}
                cartItemCount={cartItemCount}
                cartTotal={cartTotal}
                onRemoveItem={removeFromCart}
                onUpdateQuantity={updateQuantity}
                cartText={t("cart") || "Cart"}
                itemText={t("item")}
                itemsText={t("items")}
                emptyCartText={t("emptyCart") || "Your cart is empty"}
                totalText={t("total") || "Total"}
                seasonalText={tMenu("seasonal")}
                seasonalWarningText={
                  t("seasonalWarning") ||
                  "Seasonal items priced at market rate (not included in total)"
                }
              />
            </div>

            {/* Variant Selection Footer */}
            {selectedFood && selectedFoodData && (
              <VariantSelector
                foodName={selectedFoodData.name}
                variants={selectedFoodData.variants || []}
                selectedVariant={selectedVariant}
                quantity={quantityToAdd}
                onSelectVariant={setSelectedVariant}
                onQuantityChange={(delta) =>
                  setQuantityToAdd(Math.max(1, quantityToAdd + delta))
                }
                onAddToCart={handleAddToCart}
                selectVariantText={t("selectVariant")}
                quantityText={t("quantity") || "Quantity"}
                addToCartText={t("addToCart") || "Add to Cart"}
                seasonalText={tMenu("seasonal")}
                priceText={t("price") || "Price"}
                notAvailableText={t("notAvailable")}
              />
            )}

            {/* Submit Cart Footer */}
            {cart.length > 0 && !selectedFood && (
              <div className="border-t border-slate-200 dark:border-slate-700 p-3 md:p-4 bg-white dark:bg-slate-800 flex-shrink-0">
                <button
                  onClick={handleSubmitCart}
                  disabled={addOrderMutation.isPending}
                  className="button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addOrderMutation.isPending
                    ? t("ordering") || "Processing..."
                    : `${
                        t("confirmOrder") || "Confirm Order"
                      } • ${cartTotal.toFixed(2)} RM`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FoodSelector;
