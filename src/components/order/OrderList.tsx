"use client";
import { GetOrdersResponse } from "@/types/api/order/GET";
import { PresetMenu, Food, FoodVariant } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import OrderItem from "./OrderItem";
import PresetMenuItem from "./PresetMenuItem";

type OrderListProps = {
  orders: GetOrdersResponse[] | undefined;
  presetMenus:
    | (PresetMenu & {
        food: Food;
        variant: FoodVariant | null;
      })[]
    | undefined;
  isLoading: boolean;
  isEditable: boolean;
  people?: { id: string; name: string }[];
};

const OrderList = ({
  orders,
  presetMenus,
  isLoading,
  isEditable,
  people = [],
}: OrderListProps) => {
  const t = useTranslations("orders");

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/10 dark:border-slate-700 p-8">
        <div className="flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">
            {t("loading")}
          </span>
        </div>
      </div>
    );
  }

  // Show empty state only if both orders and preset menus are empty
  if (
    (!orders || orders.length === 0) &&
    (!presetMenus || presetMenus.length === 0)
  ) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/10 dark:border-slate-700 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
            <FiShoppingCart className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-2">
            {t("noOrders")}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("noOrdersMessage")}
          </p>
        </div>
      </div>
    );
  }

  const totalOrders = (orders?.length || 0) + (presetMenus?.length || 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/10 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-darkest to-darkest/90 dark:from-slate-900 dark:to-slate-900/90 px-4 py-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FiShoppingCart className="w-5 h-5" />
          {t("myOrders")}
          <span className="ml-auto text-sm opacity-90">
            {totalOrders} {totalOrders === 1 ? t("item") : t("items")}
          </span>
        </h2>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        {/* Preset Menu Items */}
        {presetMenus && presetMenus.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-yellow-300 dark:bg-yellow-700"></div>
              <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">
                Preset Menu
              </span>
              <div className="h-px flex-1 bg-yellow-300 dark:bg-yellow-700"></div>
            </div>
            {presetMenus.map((presetMenu) => (
              <PresetMenuItem key={presetMenu.id} presetMenu={presetMenu} />
            ))}
            {orders && orders.length > 0 && (
              <div className="flex items-center gap-2 my-4">
                <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Additional Orders
                </span>
                <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>
              </div>
            )}
          </>
        )}

        {/* Regular Orders */}
        {orders &&
          orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              isEditable={isEditable}
              people={people}
            />
          ))}
      </div>
    </div>
  );
};

export default OrderList;
