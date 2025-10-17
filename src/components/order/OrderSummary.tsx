"use client";
import { GetOrdersResponse } from "@/types/api/order/GET";
import { useTranslations } from "next-intl";
import React from "react";
import { FiShoppingBag, FiDollarSign } from "react-icons/fi";

type OrderSummaryProps = {
  orders: GetOrdersResponse[] | undefined;
  peopleCount: number;
};

const OrderSummary = ({ orders, peopleCount }: OrderSummaryProps) => {
  const t = useTranslations("orders");

  const totalItems =
    orders?.reduce((sum, order) => sum + order.quantity, 0) ?? 0;

  const totalPrice =
    orders?.reduce((sum, order) => {
      const price = order.variant?.price ?? order.food.variants[0]?.price ?? 0;
      return sum + price * order.quantity;
    }, 0) ?? 0;

  const pricePerPerson = peopleCount > 0 ? totalPrice / peopleCount : 0;

  // Currency is always RM
  const currency = "RM";

  return (
    <div className="bg-white rounded-lg shadow-md border border-main/10 overflow-hidden">
      {/* Header */}
      <div className="bg-darkest px-4 py-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FiDollarSign className="w-5 h-5" />
          {t("orderSummary")}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Total Items */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <span className="text-sm text-slate-600 flex items-center gap-2">
            <FiShoppingBag className="w-4 h-4" />
            {t("totalItems")}
          </span>
          <span className="text-base font-semibold text-slate-900">
            {totalItems} {totalItems === 1 ? t("item") : t("items")}
          </span>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <span className="text-sm text-slate-600">{t("totalPrice")}</span>
          <span className="text-lg font-bold text-main">
            {totalPrice.toFixed(2)} {currency}
          </span>
        </div>

        {/* Price Per Person */}
        {peopleCount > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">
              {t("pricePerPerson")} ({peopleCount}{" "}
              {peopleCount === 1 ? "person" : "people"})
            </span>
            <span className="text-base font-semibold text-slate-700">
              {pricePerPerson.toFixed(2)} {currency}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
