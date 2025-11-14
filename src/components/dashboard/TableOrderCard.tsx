"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "@/common/axios";
import { FiDollarSign } from "react-icons/fi";
import { GetTablesResponse } from "@/types/api/table/GET";

type TableOrderCardProps = {
  table: GetTablesResponse;
};

const TableOrderCard = ({ table }: TableOrderCardProps) => {
  const t = useTranslations("dashboard");
  const tOrder = useTranslations("orders");

  // Fetch orders for this table
  const { data, isLoading } = useQuery({
    queryKey: ["orders", table.id],
    queryFn: () =>
      axios.get(`/tables/${table.id}/orders`).then((res) => res.data),
  });

  const orders = data?.orders || [];

  const totalItems =
    orders.reduce(
      (sum: number, order: { quantity: number }) => sum + order.quantity,
      0
    ) || 0;
  const totalAmount =
    orders.reduce(
      (
        sum: number,
        order: {
          quantity: number;
          variant?: { price?: number | null };
          food?: { variants?: Array<{ price?: number | null }> };
        }
      ) => {
        const price =
          order.variant?.price || order.food?.variants?.[0]?.price || 0;
        return sum + price * order.quantity;
      },
      0
    ) || 0;

  // Currency is always RM regardless of stored data
  const currency = "RM";

  // Don't show this table if it has no orders or total is 0
  if (!isLoading && (orders.length === 0 || totalAmount === 0)) {
    return null;
  }

  return (
    <Link
      href={`/orders?table=${table.id}&id=${table.tableLeader?.id}`}
      className="block bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-main/30 dark:hover:border-main/50 transition-all p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {table.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {table.tableLeader?.name}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {tOrder("loading")}
        </div>
      ) : (
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {t("orderCount")}:
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {totalItems} {tOrder("items")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {t("totalAmount")}:
            </span>
            <span className="font-bold text-main dark:text-main text-lg flex items-center gap-1">
              <FiDollarSign className="w-5 h-5" />
              {totalAmount.toFixed(2)} {currency}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default TableOrderCard;
