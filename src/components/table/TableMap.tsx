"use client";
import useTables from "@/hooks/useTables";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

const TableMap = () => {
  const { data, isLoading } = useTables();
  const t = useTranslations("tables");

  const tables = data?.sort((a, b) =>
    Number(a.name.split(" ")[1]) > Number(b.name.split(" ")[1]) ? 1 : -1
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!tables || tables.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
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
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          {t("noTables")}
        </h3>
        <p className="text-slate-600">{t("noTablesMessage")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tables?.map((table) => {
        const peopleCount = table._count?.people || 0;
        const isFull = peopleCount >= table.capacity;
        const statusText = isFull ? t("full") : t("available");

        return (
          <Link
            key={table.id}
            href={`/tables/${table.id}`}
            className="group block h-full"
          >
            <div
              className={`
              relative overflow-hidden rounded-lg border-2 transition-all duration-200 h-full flex flex-col
              ${
                isFull
                  ? "border-red-200 bg-red-50 hover:border-red-400 hover:shadow-lg"
                  : "border-green-200 bg-green-50 hover:border-green-400 hover:shadow-lg"
              }
            `}
            >
              {/* Status Badge */}
              <div
                className={`
                absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                ${isFull ? "bg-red-500 text-white" : "bg-green-500 text-white"}
              `}
              >
                {statusText}
              </div>

              <div className="p-6 flex-1">
                {/* Table Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${isFull ? "bg-red-100" : "bg-green-100"}
                  `}
                  >
                    <svg
                      className={`w-6 h-6 ${
                        isFull ? "text-red-600" : "text-green-600"
                      }`}
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
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700">
                      {table.name}
                    </h3>
                  </div>
                </div>

                {/* Table Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
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
                    <span>
                      {t("capacity")}:{" "}
                      <span className="font-semibold text-slate-800">
                        {peopleCount}/{table.capacity}
                      </span>
                    </span>
                  </div>

                  {table.tableLeader ? (
                    <div className="mt-3 pt-3 border-t border-slate-200 min-h-[60px]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {table.tableLeader.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500 uppercase tracking-wide">
                            {t("partyLeader")}
                          </p>
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {table.tableLeader.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 pt-3 border-t border-slate-200 min-h-[60px] flex items-center">
                      <p className="text-sm text-slate-500 italic">
                        {t("noParty")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TableMap;
