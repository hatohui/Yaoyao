"use client";
import { GetOrdersResponse } from "@/types/api/order/GET";
import { PresetMenu, Food, FoodVariant } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import { FiShoppingBag, FiDollarSign } from "react-icons/fi";
import { DEFAULT_SET_PRICE } from "@/config/app";

type OrderSummaryProps = {
  orders: GetOrdersResponse[] | undefined;
  presetMenus:
    | (PresetMenu & {
        food: Food;
        variant: FoodVariant | null;
      })[]
    | undefined;
  peopleCount: number;
};

const OrderSummary = ({
  orders,
  presetMenus,
  peopleCount,
}: OrderSummaryProps) => {
  const t = useTranslations("orders");
  const tPreset = useTranslations("presetMenu");

  const totalItems =
    orders?.reduce((sum, order) => sum + order.quantity, 0) ?? 0;
  const presetItems =
    presetMenus?.reduce((sum, preset) => sum + preset.quantity, 0) ?? 0;
  const totalItemsWithPresets = totalItems + presetItems;

  const ordersPrice =
    orders?.reduce((sum, order) => {
      const price = order.variant?.price ?? order.food.variants[0]?.price ?? 0;
      return sum + price * order.quantity;
    }, 0) ?? 0;

  // Calculate preset price using fixed price of 500 RM
  const presetsPrice =
    presetMenus && presetMenus.length > 0 ? DEFAULT_SET_PRICE : 0;

  const totalPrice = ordersPrice + presetsPrice;
  const pricePerPerson = peopleCount > 0 ? totalPrice / peopleCount : 0;

  // Currency is always RM
  const currency = "RM";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/10 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-darkest dark:bg-slate-900 px-4 py-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FiDollarSign className="w-5 h-5" />
          {t("orderSummary")}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Total Items */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <FiShoppingBag className="w-4 h-4" />
            {t("totalItems")}
          </span>
          <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {totalItemsWithPresets}{" "}
            {totalItemsWithPresets === 1 ? t("item") : t("items")}
          </span>
        </div>

        {/* Preset Menu Price */}
        {presetMenus && presetMenus.length > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
            <span className="text-sm text-yellow-700 dark:text-yellow-400">
              {tPreset("title")} ({tPreset("fixedPrice")}):
            </span>
            <span className="text-base font-semibold text-yellow-700 dark:text-yellow-400">
              {DEFAULT_SET_PRICE.toFixed(2)} {currency}
            </span>
          </div>
        )}

        {/* Additional Orders Price */}
        {orders && orders.length > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {t("additionalOrders")}:
            </span>
            <span className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {ordersPrice.toFixed(2)} {currency}
            </span>
          </div>
        )}

        {/* Total Price */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
          <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
            {t("totalPrice")}:
          </span>
          <span className="text-lg font-bold text-main dark:text-main">
            {totalPrice.toFixed(2)} {currency}
          </span>
        </div>

        {/* Price Per Person */}
        {peopleCount > 0 && (
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {t("pricePerPerson")} ({peopleCount}{" "}
              {peopleCount === 1 ? "person" : "people"})
            </span>
            <span className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {pricePerPerson.toFixed(2)} {currency}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
