import React from "react";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";

export type TableDetailProps = {
  className?: string;
  table: GetTableByIdResponse | undefined;
  isloading: boolean;
};

const TableDetail = ({ className, table, isloading }: TableDetailProps) => {
  const t = useTranslations("tables");

  if (isloading) {
    return (
      <div className={`bg-white rounded-md shadow-sm p-4 ${className || ""}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          <div className="h-3 bg-slate-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-md shadow-sm overflow-hidden ${
        className || ""
      }`}
    >
      <div className="bg-slate-600 px-4 py-2">
        <h2 className="text-sm font-semibold text-white">{t("tableInfo")}</h2>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-500">{t("tableName")}</p>
            <p className="text-sm font-semibold text-slate-900">
              {table?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-xs font-medium">{t("capacity")}</span>
          </div>
          <span className="text-sm font-semibold text-slate-900">
            {table?.capacity} {t("people")}
          </span>
        </div>

        <div className="py-2">
          <div className="flex items-center gap-1.5 text-slate-600 mb-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs font-medium">{t("partyLeader")}</span>
          </div>
          {table?.tableLeader ? (
            <div className="ml-5 flex items-center gap-2 p-2 bg-blue-50 rounded-md border border-blue-100">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {table.tableLeader.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {table.tableLeader.name}
                </p>
                <p className="text-xs text-slate-500">{t("leader")}</p>
              </div>
            </div>
          ) : (
            <div className="ml-5 p-2 bg-slate-50 rounded-md">
              <p className="text-xs text-slate-500 italic">{t("noLeader")}</p>
            </div>
          )}
        </div>

        <div className="pt-2 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{t("created")}</span>
            <span className="text-slate-700">
              {new Date(table?.createdAt ?? "").toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{t("lastUpdated")}</span>
            <span className="text-slate-700">
              {new Date(table?.updatedAt ?? "").toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetail;
