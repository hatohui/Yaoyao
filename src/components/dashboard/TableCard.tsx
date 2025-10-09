"use client";
import React, { useRef } from "react";
import { FiUsers, FiStar, FiDollarSign } from "react-icons/fi";
import { GetTablesResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import { usePaymentStatusMutation } from "@/hooks/table/usePaymentStatusMutation";
import OrderLinkGenerator from "@/components/table/OrderLinkGenerator";
import { Order, Food, FoodVariant } from "@prisma/client";
import { useAnimations } from "@/hooks/common/useAnimations";

type OrderWithFood = Order & {
  food: (Food & { variants: FoodVariant[] }) | null;
};

type TableCardProps = {
  table: GetTablesResponse;
};

const TableCard = ({ table }: TableCardProps) => {
  const t = useTranslations("dashboard");
  const tTables = useTranslations("tables");
  const tCommon = useTranslations("common");

  const paymentMutation = usePaymentStatusMutation(table.id);
  const cardRef = useRef<HTMLDivElement>(null);
  const animations = useAnimations();

  const peopleCount = table.people?.length || 0;
  const hasLeader = !!table.tableLeader;

  const calculateTableTotal = () => {
    if (!table.orders || table.orders.length === 0) return 0;

    return table.orders.reduce((total: number, order: OrderWithFood) => {
      const variant = order.food?.variants?.find(
        (v: FoodVariant) => v.id === order.variantId
      );
      if (!variant || variant.isSeasonal) return total;
      return total + (variant.price || 0) * order.quantity;
    }, 0);
  };

  const tableTotal = calculateTableTotal();
  const perPax = peopleCount > 0 ? tableTotal / peopleCount : 0;

  const handleTogglePayment = () => {
    paymentMutation.mutate(!table.paid);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => animations.hoverScale(cardRef.current, 1.02)}
      onMouseLeave={() => animations.hoverScaleReset(cardRef.current)}
      className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden transition-shadow"
    >
      {/* Header */}
      <div className="bg-darkest px-4 py-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">{table.name}</h3>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              table.paid ? "bg-green-500 text-white" : "bg-amber-500 text-white"
            }`}
          >
            {table.paid ? tCommon("paid") : tCommon("unpaid")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2.5">
        {/* People Count */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <FiUsers className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-600">
              {tTables("people")}:
            </span>
          </div>
          <span className="font-semibold text-slate-900">
            {peopleCount} / {table.capacity}
          </span>
        </div>

        {/* Table Leader */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <FiStar className="w-3.5 h-3.5 text-yellow-500" />
            <span className="font-medium text-slate-600">
              {tTables("partyLeader")}:
            </span>
          </div>
          <span className="font-semibold text-slate-900">
            {table.tableLeader?.name || tTables("noLeader")}
          </span>
        </div>

        {/* Total Cost */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1.5">
            <FiDollarSign className="w-3.5 h-3.5 text-green-600" />
            <span className="font-medium text-slate-600 text-xs">
              {t("totalAmount")}:
            </span>
          </div>
          <span className="text-base font-bold text-green-600">
            {tableTotal.toFixed(2)} RM
          </span>
        </div>

        {/* Per Pax */}
        {peopleCount > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-600">{t("perPax")}:</span>
            <span className="font-semibold text-slate-900">
              {perPax.toFixed(2)} RM
            </span>
          </div>
        )}

        {/* Orders Count */}
        <div className="text-xs text-slate-500 text-center pt-1">
          {table.orders?.length || 0}{" "}
          {table.orders?.length === 1 ? t("orderSingular") : t("ordersPlural")}
        </div>
      </div>

      {/* Action Buttons at Bottom - Side by Side */}
      <div className="border-t border-slate-200 p-3 bg-slate-50 flex gap-2">
        {/* Payment Toggle Button */}
        <button
          onClick={handleTogglePayment}
          disabled={paymentMutation.isPending}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-xs transition-all ${
            table.paid
              ? "bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md"
              : "bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow-md"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <FiDollarSign className="w-3.5 h-3.5" />
          {paymentMutation.isPending
            ? "..."
            : table.paid
            ? tCommon("paid")
            : tCommon("unpaid")}
        </button>

        {/* Copy Order Link Button */}
        {hasLeader && (
          <div className="flex-1">
            <OrderLinkGenerator
              tableId={table.id}
              tableLeaderId={table.tableLeader!.id}
              tableName={table.name}
              simple={true}
              fullWidth={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableCard;
