import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import OrderLinkGenerator from "./OrderLinkGenerator";

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
  const t = useTranslations("tables");

  const handleback = () => {
    if (isTableLeader) router.back();
    else router.push("/tables".concat(window.location.search));
  };

  return (
    <div className="bg-white shadow-sm border-b border-main/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleback}
              className="p-1.5 hover:bg-main/10 rounded-md transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5 text-darkest" />
            </button>
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
              <h1 className="text-lg font-semibold text-darkest">
                {table?.name || t("tableDetails")}
              </h1>
              <p className="text-xs text-slate-500">{t("manageParty")}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-main/30 bg-main/5">
            <div
              className={`w-2 h-2 rounded-full ${
                isOccupied ? "bg-main" : "bg-green-500"
              }`}
            ></div>
            <span
              className={`text-xs font-medium ${
                isOccupied ? "text-darkest" : "text-green-700"
              }`}
            >
              {isOccupied ? t("occupied") : t("available")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailHeader;
