"use client";
import useFoods from "@/hooks/food/useFoods";
import useCategories from "@/hooks/food/useCategories";
import { useAddOrder } from "@/hooks/order/useOrderMutation";
import { useTranslations } from "next-intl";
import React, { useState, useRef, useEffect } from "react";
import {
  FiPlus,
  FiX,
  FiSearch,
  FiPackage,
  FiShoppingCart,
  FiMinus,
} from "react-icons/fi";
import Image from "next/image";
import axios from "@/common/axios";
import gsap from "gsap";

type CartItem = {
  foodId: string;
  foodName: string;
  foodImage: string | null;
  variantId?: string;
  variantLabel?: string;
  variantPrice: number;
  quantity: number;
  isSeasonal?: boolean;
};

type FoodSelectorProps = {
  tableId: string;
};

const FoodSelector = ({ tableId }: FoodSelectorProps) => {
  const t = useTranslations("orders");
  const tMenu = useTranslations("menu");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [variantIds, setVariantIds] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cartItemsRef = useRef<HTMLDivElement>(null);

  const { data: categories } = useCategories();
  const { data: foods, isLoading } = useFoods(selectedCategory);
  const addOrderMutation = useAddOrder(tableId);

  const filteredFoods = foods?.filter((food) => {
    if (!searchQuery) return true;
    const translatedName = food.translations?.[0]?.name || food.name;
    return translatedName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedFoodData = foods?.find((f) => f.id === selectedFood);

  // Animate modal open/close
  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Animate modal entrance
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

  // Animate cart items when they change
  useEffect(() => {
    if (cartItemsRef.current && cart.length > 0) {
      const cartItems = cartItemsRef.current.children;
      gsap.fromTo(
        cartItems[cartItems.length - 1],
        { opacity: 0, x: 20, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
      );
    }
  }, [cart.length]);

  // Fetch variant IDs when a food is selected
  useEffect(() => {
    if (selectedFood) {
      axios
        .get(`/foods/${selectedFood}?lang=en`)
        .then((res) => {
          const variantIdsFromApi =
            res.data.variants?.map((v: { id: string }) => v.id) || [];
          setVariantIds(variantIdsFromApi);
        })
        .catch(() => {
          setVariantIds([]);
        });
    }
  }, [selectedFood]);

  // Add item to cart
  const handleAddToCart = () => {
    if (!selectedFood || !selectedFoodData) return;

    // If food has variants, require variant selection
    if (selectedFoodData.variants && selectedFoodData.variants.length > 0) {
      if (selectedVariant === null) {
        alert(t("selectVariantPrompt"));
        return;
      }
    }

    const translatedName =
      selectedFoodData.translations?.[0]?.name || selectedFoodData.name;
    const variant =
      selectedFoodData.variants && selectedFoodData.variants.length > 0
        ? selectedVariant !== null
          ? selectedFoodData.variants[selectedVariant]
          : selectedFoodData.variants[0]
        : null;
    const variantId =
      selectedVariant !== null && selectedFoodData.variants?.length
        ? variantIds[selectedVariant]
        : undefined;

    const existingItemIndex = cart.findIndex(
      (item) => item.foodId === selectedFood && item.variantId === variantId
    );

    if (existingItemIndex >= 0) {
      // Increment quantity
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Add new item
      setCart([
        ...cart,
        {
          foodId: selectedFood,
          foodName: translatedName,
          foodImage: selectedFoodData.imageUrl,
          variantId,
          variantLabel: variant?.label,
          variantPrice: variant?.price ?? 0,
          quantity: 1,
          isSeasonal: variant?.isSeasonal ?? false,
        },
      ]);
    }

    // Reset selection
    setSelectedFood(null);
    setSelectedVariant(null);
    setVariantIds([]);
  };

  // Remove item from cart
  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Update cart item quantity
  const handleUpdateCartQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
  };

  // Submit all cart items
  const handleSubmitCart = async () => {
    if (cart.length === 0) return;

    try {
      // Submit all orders sequentially
      for (const item of cart) {
        await addOrderMutation.mutateAsync({
          foodId: item.foodId,
          variantId: item.variantId,
          quantity: item.quantity,
        });
      }

      // Clear cart and close modal on success
      setCart([]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting orders:", error);
    }
  };

  // Get cart quantity for a specific food/variant
  const getCartQuantity = (foodId: string, variantId?: string): number => {
    const item = cart.find(
      (i) => i.foodId === foodId && i.variantId === variantId
    );
    return item?.quantity || 0;
  };

  // Calculate cart total (excluding seasonal items)
  const cartTotal = cart.reduce((sum, item) => {
    // Skip seasonal items in total calculation
    if (item.isSeasonal) return sum;
    return sum + item.variantPrice * item.quantity;
  }, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
          setCart([]);
        },
      });
    } else {
      setIsOpen(false);
      setCart([]);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-darkest dark:bg-slate-700 hover:bg-darkest/90 dark:hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 relative"
      >
        <FiPlus className="w-5 h-5" />
        {t("orderFood")}
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex h-screen items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            ref={contentRef}
            className="bg-white dark:bg-slate-800 md:rounded-xl shadow-2xl w-full h-full md:max-w-6xl md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-darkest dark:bg-slate-900 px-4 md:px-6 py-4 flex items-center justify-between">
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
            <div className="border-b border-slate-200 dark:border-slate-700 p-3 md:p-4 space-y-3">
              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder={tMenu("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/50 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === null
                      ? "bg-main text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {tMenu("allCategories")}
                </button>
                {categories?.map((cat) => {
                  const categoryKey = cat.key.split(" ")[0].toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(categoryKey)}
                      className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === categoryKey
                          ? "bg-main text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {cat.translation?.[0]?.name || cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Food Grid and Cart Split View */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* Left: Food Grid */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 md:border-r border-slate-200 dark:border-slate-700">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
                    <span className="ml-3 text-slate-600 dark:text-slate-400 text-sm">
                      {tMenu("loading")}
                    </span>
                  </div>
                ) : filteredFoods && filteredFoods.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-3">
                    {filteredFoods.map((food) => {
                      const translatedName =
                        food.translations?.[0]?.name || food.name;
                      const isSelected = selectedFood === food.id;
                      const isAvailable = food.available;
                      const inCartCount =
                        food.variants?.reduce((sum, variant, idx) => {
                          return (
                            sum + getCartQuantity(food.id, variantIds[idx])
                          );
                        }, 0) || 0;

                      return (
                        <button
                          key={food.id}
                          onClick={() => {
                            if (!isAvailable) return;
                            setSelectedFood(food.id);
                            setSelectedVariant(null);
                          }}
                          disabled={!isAvailable}
                          className={`relative text-left rounded-lg border-2 overflow-hidden transition-all ${
                            isSelected
                              ? "border-darkest dark:border-main shadow-lg ring-2 ring-darkest/20 dark:ring-main/20"
                              : isAvailable
                              ? "border-slate-200 dark:border-slate-700 hover:border-darkest/30 dark:hover:border-main/30 hover:shadow-md"
                              : "border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed"
                          }`}
                        >
                          {/* Cart Badge */}
                          {inCartCount > 0 && (
                            <div className="absolute top-2 right-2 z-10 bg-main text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                              {inCartCount}
                            </div>
                          )}

                          <div className="relative h-28 bg-slate-100 dark:bg-slate-700">
                            {food.imageUrl ? (
                              <Image
                                src={food.imageUrl}
                                alt={translatedName}
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
                                  {tMenu("unavailable")}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-2 bg-white dark:bg-slate-800">
                            <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {translatedName}
                            </h3>
                            {food.variants && food.variants.length > 0 && (
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                {food.variants[0].isSeasonal ? (
                                  <span className="text-amber-600 dark:text-amber-400">
                                    (Seasonal)
                                  </span>
                                ) : (
                                  `${food.variants[0].price?.toFixed(2)} RM`
                                )}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400">
                      {tMenu("noFoodsMessage")}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Cart Preview - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block w-80 bg-slate-50 dark:bg-slate-900 p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {t("cart") || "Cart"}
                  </h3>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {cartItemCount}{" "}
                    {cartItemCount === 1 ? t("item") : t("items")}
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingCart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t("emptyCart") || "Your cart is empty"}
                    </p>
                  </div>
                ) : (
                  <div ref={cartItemsRef} className="space-y-2">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3"
                      >
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
                                  {tMenu("seasonal")}
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
                                  {(item.variantPrice * item.quantity).toFixed(
                                    2
                                  )}{" "}
                                  RM
                                </>
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(index)}
                            className="flex-shrink-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded p-1 transition-colors"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                handleUpdateCartQuantity(index, -1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-slate-900 dark:text-slate-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateCartQuantity(index, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>
                          {!item.isSeasonal && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {item.variantPrice.toFixed(2)} RM ×{" "}
                              {item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cart Total */}
                {cart.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-700">
                    {cart.some((item) => item.isSeasonal) && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>
                          Seasonal items priced at market rate (not included in
                          total)
                        </span>
                      </p>
                    )}
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className="text-slate-900 dark:text-slate-100">
                        {t("total") || "Total"}
                      </span>
                      <span className="text-main">
                        {cartTotal.toFixed(2)} RM
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Variant Selection Footer (when food is selected) */}
            {selectedFood && selectedFoodData && (
              <div className="border-t border-slate-200 dark:border-slate-700 p-3 md:p-4 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    {selectedFoodData.translations?.[0]?.name ||
                      selectedFoodData.name}
                  </h3>

                  {/* Variant Selection */}
                  {selectedFoodData.variants &&
                    selectedFoodData.variants.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
                          {t("selectVariant")}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {selectedFoodData.variants.map((variant, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedVariant(idx)}
                              disabled={!variant.available}
                              className={`p-2 md:p-3 rounded-lg border-2 text-left transition-all ${
                                selectedVariant === idx
                                  ? "border-darkest dark:border-main bg-darkest/5 dark:bg-main/10"
                                  : variant.available
                                  ? "border-slate-200 dark:border-slate-700 hover:border-darkest/30 dark:hover:border-main/30"
                                  : "border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed"
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <div className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
                                  {variant.label}
                                </div>
                                {variant.isSeasonal && (
                                  <span className="text-[8px] px-1 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded font-semibold whitespace-nowrap">
                                    {tMenu("seasonal")}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs md:text-sm text-darkest dark:text-main font-semibold mt-1">
                                {variant.isSeasonal ? (
                                  <span className="text-amber-600 dark:text-amber-400">
                                    (Seasonal Price)
                                  </span>
                                ) : (
                                  `${variant.price?.toFixed(2)} RM`
                                )}
                              </div>
                              {!variant.available && (
                                <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                                  {t("notAvailable")}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  <button
                    onClick={handleAddToCart}
                    className="w-full mt-4 bg-darkest dark:bg-slate-700 hover:bg-darkest/90 dark:hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all text-sm md:text-base"
                  >
                    <FiPlus className="w-4 h-4 inline mr-2" />
                    {t("addToCart") || "Add to Cart"}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Cart Footer - Mobile & Desktop */}
            {cart.length > 0 && !selectedFood && (
              <div className="border-t border-slate-200 dark:border-slate-700 p-3 md:p-4 bg-white dark:bg-slate-800">
                <div className="flex flex-col gap-2">
                  {/* Mobile: Cart items list (collapsible) */}
                  <div className="md:hidden">
                    <button
                      onClick={() => setShowMobileCart(!showMobileCart)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-700 rounded-lg text-sm"
                    >
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {cartItemCount}{" "}
                        {cartItemCount === 1 ? t("item") : t("items")} in cart
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-darkest dark:text-slate-100">
                          {cart.some((item) => item.isSeasonal)
                            ? "(Seasonal Price)"
                            : `${cartTotal.toFixed(2)} RM`}
                        </span>
                        <FiShoppingCart className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                      </div>
                    </button>

                    {/* Mobile cart items dropdown */}
                    {showMobileCart && (
                      <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                        {cart.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-2"
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                                    {item.foodName}
                                  </h4>
                                  {item.isSeasonal && (
                                    <span className="text-[8px] px-1 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded font-semibold whitespace-nowrap">
                                      {tMenu("seasonal")}
                                    </span>
                                  )}
                                </div>
                                {item.variantLabel && (
                                  <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {item.variantLabel}
                                  </p>
                                )}
                                <p className="text-xs font-semibold text-main mt-0.5">
                                  {item.isSeasonal ? (
                                    <span className="text-amber-600 dark:text-amber-400">
                                      (Seasonal Price)
                                    </span>
                                  ) : (
                                    `${(
                                      item.variantPrice * item.quantity
                                    ).toFixed(2)} RM`
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-slate-600 dark:text-slate-400">
                                  ×{item.quantity}
                                </span>
                                <button
                                  onClick={() => handleRemoveFromCart(index)}
                                  className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                >
                                  <FiX className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSubmitCart}
                    disabled={addOrderMutation.isPending}
                    className="w-full bg-main hover:bg-main/90 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm md:text-base"
                  >
                    {addOrderMutation.isPending
                      ? t("ordering") || "Processing..."
                      : `${t("confirmOrder") || "Confirm Order"} ${
                          window.innerWidth >= 768
                            ? cart.some((item) => item.isSeasonal)
                              ? "+ Seasonal"
                              : `• ${cartTotal.toFixed(2)} RM`
                            : ""
                        }`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FoodSelector;
