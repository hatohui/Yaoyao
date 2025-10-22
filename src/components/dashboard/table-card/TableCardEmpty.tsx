"use client";
import React from "react";
import { FiUsers, FiPlus } from "react-icons/fi";
import { useTranslations } from "next-intl";

type TableCardEmptyProps = {
  canAddMember: boolean;
  onAddClick: () => void;
};

const TableCardEmpty = ({ canAddMember, onAddClick }: TableCardEmptyProps) => {
  const t = useTranslations("tables");

  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 mb-2">
        <FiUsers className="w-5 h-5 text-slate-400 dark:text-slate-500" />
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
        {t("noGuests") || "No guests yet"}
      </p>
      {canAddMember && (
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all bg-main/10 hover:bg-main/20 text-main dark:bg-main/20 dark:hover:bg-main/30"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>{t("addMemberCard")}</span>
        </button>
      )}
    </div>
  );
};

export default TableCardEmpty;
