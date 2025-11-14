"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiEye, FiEyeOff } from "react-icons/fi";

type StatusFilterProps = {
  selectedStatus: "all" | "available" | "unavailable";
  onStatusChange: (status: "all" | "available" | "unavailable") => void;
};

const StatusFilter = ({
  selectedStatus,
  onStatusChange,
}: StatusFilterProps) => {
  const t = useTranslations("dashboard");

  const statusOptions = [
    { value: "all" as const, label: t("allStatus") || "All", icon: null },
    {
      value: "available" as const,
      label: t("available") || "Available",
      icon: FiEye,
    },
    {
      value: "unavailable" as const,
      label: t("unavailable") || "Unavailable",
      icon: FiEyeOff,
    },
  ];

  return (
    <div className="flex gap-2">
      {statusOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedStatus === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
              isSelected
                ? "bg-main text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilter;
