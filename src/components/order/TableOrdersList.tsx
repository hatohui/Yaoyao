"use client";
import useTableOrders from "@/hooks/order/useTableOrders";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";
import { FiShoppingCart, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import OrderItem from "./OrderItem";

type TableOrdersListProps = { tableId: string };

const TableOrdersList = ({ tableId }: TableOrdersListProps) => {
  const { data: orders, isLoading } = useTableOrders(tableId);
  const t = useTranslations("orders");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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
      <div
        className="bg-darkest px-4 py-2.5 cursor-pointer hover:bg-darkest/90 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
            {t("myOrders")}
            <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-main text-white rounded">
              {orders.length}
            </span>
          </h2>
          {isCollapsed ? (
            <FiChevronDown className="w-4 h-4 text-white" />
          ) : (
            <FiChevronUp className="w-4 h-4 text-white" />
          )}
        </div>
      </div>

      <div ref={contentRef} className="overflow-hidden">
        {/* Summary */}
        <div className="px-4 py-3 border-b border-main/10 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{t("items")}:</span>
              <span className="text-sm font-semibold text-slate-900">
                {totalItems}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{t("total")}:</span>
              <span className="text-sm font-semibold text-main">
                {subtotal.toFixed(2)} RM
              </span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="p-4 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto min-h-[300px]">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} isEditable={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOrdersList;
