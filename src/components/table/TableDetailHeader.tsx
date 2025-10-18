import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import OrderLinkGenerator from "./OrderLinkGenerator";
import Link from "next/link";
import { mergeQueryParams } from "@/utils/mergeQueryParams";

export type TableHeaderProps = {
  table: GetTableByIdResponse | undefined;
  isOccupied: boolean;
  isTableLeader: boolean;
  isVerified: boolean;
};

const TableDetailHeader = ({
  table,
  isOccupied,
  isTableLeader,
  isVerified,
}: TableHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("tables");
  const tOrders = useTranslations("orders");

  const handleback = () => {
    router.back();
  };

  // Generate orders link with preserved query params
  const ordersLinkQuery = mergeQueryParams(searchParams, {
    table: table?.id,
    id: table?.tableLeader?.id,
  });

  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-main/20 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Back button and title */}
          <div className="flex items-center gap-3">
            {/* Show back button only for verified users and normal members (not table leaders) */}
            {(isVerified || !isTableLeader) && (
              <button
                onClick={handleback}
                className="p-1.5 hover:bg-main/10 dark:hover:bg-slate-700 rounded-md transition-colors"
                aria-label="Go back"
              >
                <FiArrowLeft className="w-5 h-5 text-darkest dark:text-slate-300" />
              </button>
            )}
            {/* Order Link Generator - For Table Leaders (with param) and Yaoyao */}
            {table?.tableLeader && (isTableLeader || isVerified) && (
              <OrderLinkGenerator
                tableId={table.id}
                tableLeaderId={table.tableLeader.id}
                tableName={table.name}
                simple
              />
            )}
            <div>
              <h1 className="text-lg font-semibold text-darkest dark:text-slate-100">
                {table?.name || t("tableDetails")}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t("manageParty")}
              </p>
            </div>
          </div>

          {/* Right Side - Status badge and Manage Orders button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-main/30 dark:border-slate-700 bg-main/5 dark:bg-main/10">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOccupied ? "bg-main" : "bg-green-500"
                }`}
              ></div>
              <span
                className={`text-xs font-medium ${
                  isOccupied
                    ? "text-darkest dark:text-slate-200"
                    : "text-green-700 dark:text-green-400"
                }`}
              >
                {isOccupied ? t("occupied") : t("available")}
              </span>
            </div>

            {/* Manage Orders Button - Only for table leaders (not verified or normal users) */}
            {isTableLeader && !isVerified && table?.tableLeader && (
              <Link
                href={`/orders?${ordersLinkQuery}`}
                className="px-3 py-1.5 bg-main/10 dark:bg-main/20 hover:bg-main/20 dark:hover:bg-main/30 rounded-lg transition-colors text-main font-medium text-sm flex items-center gap-2"
              >
                <FiShoppingCart className="w-4 h-4" />
                <span>{tOrders("manageOrders") || "Manage Orders"}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailHeader;
