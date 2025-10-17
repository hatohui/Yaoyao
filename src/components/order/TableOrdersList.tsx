"use client";
import useTableOrders from "@/hooks/order/useTableOrders";
import { useTranslations } from "next-intl";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import OrderItem from "./OrderItem";

type TableOrdersListProps = { tableId: string };

const TableOrdersList = ({ tableId }: TableOrdersListProps) => {
  const { data: orders, isLoading } = useTableOrders(tableId);
  const t = useTranslations("orders");

  // compute totals
  const totalItems =
    orders?.reduce((acc, o) => acc + (o.quantity ?? 0), 0) ?? 0;
  const subtotal = orders
    ? orders.reduce((acc, o) => {
        const price = o.variant?.price ?? o.food?.variants?.[0]?.price ?? 0;
        return acc + price * (o.quantity ?? 0);
      }, 0)
    : 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-main/10 p-8">
        <div className="flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
          <span className="ml-3 text-slate-600">{t("loading")}</span>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-main/10 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <FiShoppingCart className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-base font-medium text-slate-900 mb-2">
            {t("noOrders")}
          </h3>
          <p className="text-sm text-slate-600">{t("noOrdersMessage")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-main/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-darkest to-darkest/90 px-4 py-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          {t("myOrders")}
          <span className="ml-auto text-sm opacity-90">
            {orders.length} {orders.length === 1 ? t("item") : t("items")}
          </span>
        </h2>
      </div>

      {/* Summary */}
      <div className="px-4 py-3 border-b border-main/10 bg-white">
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600">{t("totalItems")}</div>
          <div className="font-semibold text-slate-900">{totalItems}</div>
          <div className="ml-auto text-sm text-slate-600">{t("total")}</div>
          <div className="font-semibold text-main">
            {subtotal.toFixed(2)} RM
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} isEditable={false} />
        ))}
      </div>
    </div>
  );
};

export default TableOrdersList;
