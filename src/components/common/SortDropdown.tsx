"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { FiGrid } from "react-icons/fi";
import {
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortNumericDown,
  BsSortNumericUp,
} from "react-icons/bs";

export type SortOption =
  | "none"
  | "name-asc"
  | "name-desc"
  | "number-asc"
  | "number-desc";

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const t = useTranslations("tables");

  const options: { value: SortOption; label: string; icon: React.ReactNode }[] =
    [
      {
        value: "none",
        label: t("sortNone") || "No sort",
        icon: <FiGrid className="w-4 h-4" />,
      },
      {
        value: "name-asc",
        label: t("sortNameAsc") || "A-Z",
        icon: <BsSortAlphaDown className="w-4 h-4" />,
      },
      {
        value: "name-desc",
        label: t("sortNameDesc") || "Z-A",
        icon: <BsSortAlphaUp className="w-4 h-4" />,
      },
      {
        value: "number-asc",
        label: t("sortNumberAsc") || "1-9",
        icon: <BsSortNumericDown className="w-4 h-4" />,
      },
      {
        value: "number-desc",
        label: t("sortNumberDesc") || "9-1",
        icon: <BsSortNumericUp className="w-4 h-4" />,
      },
    ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              value === option.value
                ? "bg-main text-white shadow-md border border-main"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:border-main dark:hover:border-main hover:text-main dark:hover:text-main"
            }
          `}
          title={option.label}
        >
          {option.icon}
          <span className="hidden sm:inline">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SortDropdown;
