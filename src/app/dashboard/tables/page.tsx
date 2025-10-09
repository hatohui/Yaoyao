"use client";
import React, { useState } from "react";
import useTables from "@/hooks/table/useTables";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import Loading from "@/components/common/Loading";
import { FiUsers, FiFilter, FiSearch } from "react-icons/fi";
import TableCard from "@/components/dashboard/TableCard";
import {
  usePageAnimation,
  useCardStaggerAnimation,
} from "@/hooks/common/useAnimations";

const DashboardTablesPage = () => {
  const { isVerified } = useYaoAuth();
  const t = useTranslations("dashboard");
  const tTables = useTranslations("tables");

  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "unpaid">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tables, isLoading } = useTables();

  // Filter tables based on payment status and search query
  const filteredTables = tables?.filter((table) => {
    // Payment filter
    if (paymentFilter === "paid" && !table.paid) return false;
    if (paymentFilter === "unpaid" && table.paid) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = table.name.toLowerCase().includes(query);
      const matchesLeader = table.tableLeader?.name
        ?.toLowerCase()
        .includes(query);
      const matchesPeople = table.people?.some((person) =>
        person.name.toLowerCase().includes(query)
      );
      return matchesName || matchesLeader || matchesPeople;
    }

    return true;
  });

  // Animation refs
  const pageRef = usePageAnimation();
  const cardsRef = useCardStaggerAnimation([filteredTables]);

  if (!isVerified) {
    return notFound();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-bold text-darkest">
            {t("tablesManagement") || "Tables Management"}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {t("tablesManagementDesc") ||
              "Manage all table details, orders, and payments"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tables, leaders, or guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
            />
          </div>
        </div>

        {/* Payment Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <FiFilter className="text-slate-400 w-5 h-5" />
              <span className="text-sm font-medium text-slate-700">
                {t("filterByPayment") || "Filter by Payment"}:
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPaymentFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  paymentFilter === "all"
                    ? "bg-main text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("allTables") || "All Tables"}
              </button>
              <button
                onClick={() => setPaymentFilter("paid")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  paymentFilter === "paid"
                    ? "bg-green-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("paidOnly") || "Paid Only"}
              </button>
              <button
                onClick={() => setPaymentFilter("unpaid")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  paymentFilter === "unpaid"
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("unpaidOnly") || "Unpaid Only"}
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            {filteredTables?.length || 0} {tTables("tableName")}{" "}
            {t("found") || "found"}
          </div>
        </div>

        {/* Tables Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTables?.map((table) => (
            <div key={table.id} data-animate-card>
              <TableCard table={table} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTables?.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {tTables("noTables") || "No tables found"}
            </h3>
            <p className="text-slate-600">
              {tTables("noTablesMessage") ||
                "No tables match the selected filter"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTablesPage;
