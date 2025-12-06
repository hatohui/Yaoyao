"use client";
import useTableOrders from "@/hooks/order/useTableOrders";
import { useTranslations } from "next-intl";
import React, { useState, useRef, useEffect } from "react";
import { FiShoppingCart, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import OrderItem from "./OrderItem";
import PresetMenuItem from "./PresetMenuItem";
import { DEFAULT_SET_PRICE } from "@/config/app";
import usePeopleInTable from "@/hooks/table/usePeopleInTable";

type TableOrdersListProps = { tableId: string };

const TableOrdersList = ({ tableId }: TableOrdersListProps) => {
  const { data, isLoading } = useTableOrders(tableId);
  const { data: people } = usePeopleInTable(tableId);
  const orders = data?.orders || [];
  const presetMenus = data?.presetMenus || [];
  const peopleCount = people?.length || 0;
  const t = useTranslations("orders");
  const tPreset = useTranslations("presetMenu");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Collapse by default on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    setIsCollapsed(isMobile);
  }, []);

  useGSAP(() => {
    if (contentRef.current) {
      if (isCollapsed) {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      } else {
        // Get the natural height
        const element = contentRef.current;
        gsap.set(element, { height: "auto" });
        const height = element.offsetHeight;
        gsap.fromTo(
          element,
          { height: 0, opacity: 0 },
          { height: height, opacity: 1, duration: 0.3, ease: "power2.inOut" }
        );
        gsap.set(element, { height: "auto", delay: 0.3 });
      }
    }
  }, [isCollapsed]);

  // compute totals
  const totalItems =
    orders?.reduce((acc, o) => acc + (o.quantity ?? 0), 0) ?? 0;
  const presetItemsCount =
    presetMenus?.reduce((acc, p) => acc + (p.quantity ?? 0), 0) ?? 0;
  const totalItemsWithPresets = totalItems + presetItemsCount;

  const ordersSubtotal = orders
    ? orders.reduce((acc, o) => {
        // Compute availability like OrderItem: food.available && variant?.available
        const isVariantAvailable = o.variant?.available ?? true;
        const isFoodAvailable =
          (o.food?.available ?? true) && !o.food?.isHidden;
        const isAvailable = isFoodAvailable && isVariantAvailable;

        // Use price from order.variant if present else fall back to first food variant
        const usedVariant = o.variant ?? o.food.variants?.[0] ?? null;
        const price = usedVariant?.price ?? 0;
        const multiplier = Number(isAvailable);
        return acc + price * (o.quantity ?? 0) * multiplier;
      }, 0)
    : 0;

  // Preset menu uses fixed price of 500 (DEFAULT_SET_PRICE) total
  const presetsSubtotal =
    presetMenus && presetMenus.length > 0 ? DEFAULT_SET_PRICE : 0;

  const subtotal = ordersSubtotal + presetsSubtotal;
  const currency =
    orders?.[0]?.variant?.currency ??
    orders?.[0]?.food?.variants?.[0]?.currency ??
    "RM";

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/10 dark:border-main/30 p-8">
        <div className="flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main dark:border-main border-r-transparent"></div>
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

  return (
    <div
      className={`bg-white ${
        isCollapsed ? "h-auto" : "flex flex-col min-h-0"
      } dark:bg-slate-800 rounded-lg shadow-md border border-main/10 dark:border-slate-700 overflow-hidden`}
    >
      {/* Header */}
      <div
        className="bg-darkest dark:bg-slate-900 px-4 py-2.5 cursor-pointer hover:bg-darkest/90 dark:hover:bg-slate-900/90 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
            {t("myOrders")}
            <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-main text-white dark:bg-main dark:text-slate-900 dark:shadow-main/30 rounded">
              {orders.length + presetMenus.length}
            </span>
          </h2>
          {isCollapsed ? (
            <FiChevronDown className="w-4 h-4 text-white" />
          ) : (
            <FiChevronUp className="w-4 h-4 text-white" />
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        className={`${isCollapsed ? "" : "flex-1 min-h-0"} overflow-hidden`}
      >
        <div className={`${isCollapsed ? "" : "h-full flex flex-col"}`}>
          {/* Summary */}
          <div className="px-4 py-3 border-b border-main/10 dark:border-main/30 bg-white dark:bg-slate-800">
            <div className="space-y-2">
              {/* Items and Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {t("items")}:
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {totalItemsWithPresets}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {t("total")}:
                  </span>
                  <span className="text-sm font-semibold text-main dark:text-main">
                    {subtotal.toFixed(2)} {currency}
                  </span>
                </div>
              </div>

              {/* Per Pax */}
              {peopleCount > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    {t("perPax")} ({peopleCount}{" "}
                    {peopleCount === 1 ? t("person") : t("people")})
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {(subtotal / peopleCount).toFixed(2)} {currency}
                  </span>
                </div>
              )}

              {/* Breakdown */}
              {presetMenus && presetMenus.length > 0 && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-yellow-700 dark:text-yellow-400 font-medium">
                      {tPreset("title")} ({tPreset("fixedPrice")})
                    </span>
                    <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                      {DEFAULT_SET_PRICE.toFixed(2)} {currency}
                    </span>
                  </div>
                  {orders && orders.length > 0 && (
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-slate-500 dark:text-slate-400">
                        {t("additionalOrders")}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {ordersSubtotal.toFixed(2)} {currency}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Orders List */}
          <div
            className={`p-4 space-y-3 ${
              isCollapsed ? "" : "flex-1 min-h-0"
            } overflow-y-auto`}
          >
            {/* Preset Menu Items */}
            {presetMenus && presetMenus.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px flex-1 bg-yellow-300 dark:bg-yellow-700"></div>
                  <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">
                    {tPreset("title")}
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
            {orders.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                isEditable={false}
                people={people || []}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOrdersList;
