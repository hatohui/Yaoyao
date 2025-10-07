"use client";
import PeopleInTable from "@/components/table/PeopleInTable";
import PeopleMutationBox from "@/components/table/PeopleMutationBox";
import TableDetail from "@/components/table/TableDetail";
import TableMutationBox from "@/components/table/TableMutationBox";
import usePeopleInTable from "@/hooks/usePeopleInTable";
import useTableDetail from "@/hooks/useTableDetail";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const TableDetailPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const t = useTranslations("tables");
  const { data: table, isLoading: isLoadingTable } = useTableDetail(id);
  const { data: people, isLoading: isLoadingPeople } = usePeopleInTable(
    table?.id ?? ""
  );

  const isLoading = isLoadingTable || isLoadingPeople;
  const isOccupied = !!table?.tableLeader;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                aria-label="Go back"
              >
                <svg
                  className="w-5 h-5 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">
                  {table?.name || t("tableDetails")}
                </h1>
                <p className="text-xs text-slate-500">{t("manageParty")}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-300">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOccupied ? "bg-blue-500" : "bg-green-500"
                }`}
              ></div>
              <span
                className={`text-xs font-medium ${
                  isOccupied ? "text-blue-700" : "text-green-700"
                }`}
              >
                {isOccupied ? t("occupied") : t("available")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Table Info */}
          <div className="lg:col-span-1 space-y-4">
            <TableDetail table={table} isloading={isLoading} />
            <TableMutationBox table={table} />
          </div>

          {/* Right Column - People Management */}
          <div className="lg:col-span-2 space-y-4">
            <PeopleMutationBox id={id} />
            <PeopleInTable table={table} people={people} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailPage;
