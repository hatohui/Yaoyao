"use client";
import React, { useState } from "react";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import { FiGrid, FiUsers, FiUser, FiEdit2 } from "react-icons/fi";
import useTableMutation from "@/hooks/table/useTableMutation";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import CapacityForm from "./forms/CapacityForm";

export type TableDetailProps = {
  className?: string;
  table: GetTableByIdResponse | undefined;
  isloading: boolean;
  compact?: boolean;
};

const TableDetail = ({
  className,
  table,
  isloading,
  compact = false,
}: TableDetailProps) => {
  const t = useTranslations("tables");
  const { isVerified } = useYaoAuth();
  const { changeCapacity } = useTableMutation();
  const [isEditingCapacity, setIsEditingCapacity] = useState(false);

  const handleSubmit = (capacity: number) => {
    changeCapacity.mutate(
      {
        newCapacity: capacity,
        tableId: table?.id ?? "",
      },
      {
        onSuccess: () => {
          setIsEditingCapacity(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setIsEditingCapacity(false);
  };

  const handleEdit = () => {
    setIsEditingCapacity(true);
  };

  if (isloading) {
    return (
      <div
        className={`bg-white dark:bg-slate-800 rounded-md shadow-sm p-4 ${
          className || ""
        }`}
      >
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-main/10 dark:border-slate-700 ${
        className || ""
      }`}
    >
      <div className="bg-darkest dark:bg-slate-900 px-4 py-2.5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">{t("tableInfo")}</h2>
      </div>

      <div className="overflow-hidden">
        <div className={`p-4 space-y-3 ${compact ? "min-h-[300px]" : ""}`}>
          <div className="flex items-center gap-2 pb-2 border-b border-main/10 dark:border-slate-700">
            <div className="w-8 h-8 rounded-md bg-main/10 dark:bg-main/20 flex items-center justify-center flex-shrink-0">
              <FiGrid className="w-4 h-4 text-main" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t("tableName")}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {table?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-main/10 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-darkest dark:text-slate-300">
              <FiUsers className="w-4 h-4" />
              <span className="text-xs font-medium">{t("capacity")}</span>
            </div>
            {isVerified ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {table?.capacity} {t("people")}
                </span>
                <button
                  onClick={handleEdit}
                  disabled={isEditingCapacity}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors disabled:opacity-50"
                  title={t("changeCapacity")}
                >
                  <FiEdit2 className="w-3.5 h-3.5 text-main" />
                </button>
              </div>
            ) : (
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {table?.capacity} {t("people")}
              </span>
            )}
          </div>

          {/* Capacity Edit Form */}
          {isVerified && isEditingCapacity && (
            <div className="py-2 border-b border-main/10 dark:border-slate-700">
              <CapacityForm
                key={table?.capacity ?? 0}
                currentCapacity={table?.capacity ?? 0}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                onEdit={handleEdit}
                isPending={changeCapacity.isPending}
                isEditing={isEditingCapacity}
                formError={changeCapacity.formError}
                formSuccess={changeCapacity.formSuccess}
                clearError={changeCapacity.clearError}
              />
            </div>
          )}

          {!compact && (
            <div className="py-2">
              <div className="flex items-center gap-1.5 text-darkest dark:text-slate-300 mb-2">
                <FiUser className="w-4 h-4" />
                <span className="text-xs font-medium">{t("partyLeader")}</span>
              </div>
              {table?.tableLeader ? (
                <div className="ml-5 flex items-center gap-2 p-2 bg-main/10 dark:bg-main/20 rounded-md border border-main/20 dark:border-main/30">
                  <div className="w-7 h-7 rounded-full bg-main flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {table.tableLeader.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                      {table.tableLeader.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t("leader")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="ml-5 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {t("noLeader")}
                  </p>
                </div>
              )}
            </div>
          )}

          {!compact && (
            <div className="pt-2 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  {t("created")}
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {new Date(table?.createdAt ?? "").toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  {t("lastUpdated")}
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {new Date(table?.updatedAt ?? "").toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableDetail;
