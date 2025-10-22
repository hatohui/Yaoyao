"use client";
import { useState } from "react";

export type CartItem = {
  foodId: string;
  foodName: string;
  foodImage: string | null;
  variantId?: string;
  variantLabel?: string;
  variantPrice: number;
  quantity: number;
  isSeasonal?: boolean;
};

export const useFoodCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number) => {
    const existingItemIndex = cart.findIndex(
      (i) => i.foodId === item.foodId && i.variantId === item.variantId
    );

    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
  };

  const getCartQuantity = (foodId: string, variantId?: string): number => {
    const item = cart.find(
      (i) => i.foodId === foodId && i.variantId === variantId
    );
    return item?.quantity || 0;
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    if (item.isSeasonal) return sum;
    return sum + item.variantPrice * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  };
};
