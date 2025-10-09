"use client";

import useTableDetail from "@/hooks/table/useTableDetail";
import usePeopleInTable from "@/hooks/table/usePeopleInTable";
import useTableOrders from "@/hooks/order/useTableOrders";
import useTableLeaderAuth from "@/hooks/auth/useTableLeaderAuth";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "@/components/common/Loading";
import FoodSelector from "@/components/order/FoodSelector";
import OrderList from "@/components/order/OrderList";
import OrderSummary from "@/components/order/OrderSummary";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FiArrowLeft, FiUsers } from "react-icons/fi";
import OrderLinkGenerator from "@/components/table/OrderLinkGenerator";

const OrderPage = () => {
  const t = useTranslations("orders");
  const tTable = useTranslations("tables");
  const params = useSearchParams();
  const tableId = params?.get("table");
  const leaderId = params?.get("id");

  const { data: table, isLoading: isLoadingTable } = useTableDetail(
    tableId || ""
  );
  const { data: people, isLoading: isLoadingPeople } = usePeopleInTable(
    table?.id ?? ""
  );
  const { data: orders, isLoading: isLoadingOrders } = useTableOrders(
    table?.id ?? ""
  );

  // Security: Validate table leader authorization
  const { isValid } = useTableLeaderAuth(table?.tableLeader?.id, leaderId);

  useEffect(() => {
    if (isLoadingTable) return;

    // Redirect to 404 if:
    // 1. No tableId or leaderId provided
    // 2. Table doesn't exist
    // 3. Leader ID doesn't match table leader
    if (!tableId || !leaderId || !table || !isValid) {
      notFound();
    }
  }, [table, tableId, leaderId, isValid, isLoadingTable]);

  const peopleCount = people?.length ?? 0;
  const isLoading = isLoadingTable || isLoadingPeople;

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-main/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href={`/tables/${tableId}?id=${leaderId}`}
                className="p-1.5 hover:bg-main/10 rounded-md transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 text-darkest" />
              </Link>
              {table && (
                <OrderLinkGenerator
                  tableId={table.id}
                  tableLeaderId={table.tableLeader?.id ?? ""}
                  tableName={table.name}
                  simple
                />
              )}

              <div>
                <h1 className="text-lg font-semibold text-darkest">
                  {table?.name || t("title")}
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <FiUsers className="w-3.5 h-3.5" />
                  <span>
                    {peopleCount}{" "}
                    {peopleCount === 1 ? tTable("people") : tTable("people")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Order Summary (Sticky on desktop, normal on mobile) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              {table && (
                <OrderSummary
                  orders={orders}
                  peopleCount={peopleCount}
                  isPaid={table.paid ?? false}
                />
              )}
            </div>
          </div>

          {/* Right Column - Food Selection and Orders */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6 order-1 lg:order-2">
            {/* Food Selector */}
            {table && <FoodSelector tableId={table.id} />}

            {/* Orders List - Editable for table leader */}
            {table && (
              <OrderList
                orders={orders}
                isLoading={isLoadingOrders}
                isEditable={true} // Always editable since only table leader can access this page
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
