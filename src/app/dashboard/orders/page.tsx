"use client";
import useTables from "@/hooks/table/useTables";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useState } from "react";
import { FiFilter, FiShoppingBag } from "react-icons/fi";
import Loading from "@/components/common/Loading";
import TableOrderCard from "@/components/dashboard/TableOrderCard";

const DashboardOrdersPage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("dashboard");
  const tOrder = useTranslations("orders");

  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "unpaid">(
    "all"
  );

  const { data: tables, isLoading } = useTables();

  if (!isYaoyao) {
    return notFound();
  }
  const occupiedTables = tables?.filter((table) => table.tableLeader);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-darkest dark:text-slate-100">
            {t("ordersTitle") || "Orders Dashboard"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {t("ordersSubtitle") || "View and manage all table orders"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-6">
          <div className="flex items-center gap-4">
            <FiFilter className="text-slate-400 dark:text-slate-500 w-5 h-5" />
            <div className="flex gap-2">
              <button
                onClick={() => setPaymentFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  paymentFilter === "all"
                    ? "bg-main text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {t("allTables") || "All Tables"}
              </button>
              <button
                onClick={() => setPaymentFilter("paid")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  paymentFilter === "paid"
                    ? "bg-green-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {t("paidOnly") || "Paid Only"}
              </button>
              <button
                onClick={() => setPaymentFilter("unpaid")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  paymentFilter === "unpaid"
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {t("unpaidOnly") || "Unpaid Only"}
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            {occupiedTables?.length || 0} {t("tableColumn")}{" "}
            {t("found") || "found"}
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occupiedTables?.map((table) => (
            <TableOrderCard key={table.id} table={table} />
          ))}
        </div>

        {/* Empty State */}
        {(!occupiedTables || occupiedTables.length === 0) && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 py-12 text-center">
            <FiShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              {tOrder("noOrders") || "No tables with orders"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOrdersPage;
