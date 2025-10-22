"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SearchBar from "@/components/common/SearchBar";
import TablesViewToggle from "./TablesViewToggle";

type TablesHeaderProps = {
  isStaging: boolean;
  onToggleStaging: (value: boolean) => void;
};

const TablesHeader = ({ isStaging, onToggleStaging }: TablesHeaderProps) => {
  const t = useTranslations("tables");

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="p-4 space-y-4">
        <TablesViewToggle isStaging={isStaging} onToggle={onToggleStaging} />
        <SearchBar
          placeholder={
            t("searchPlaceholder") || "Search tables, leaders, or guests..."
          }
        />
      </div>
    </div>
  );
};

export default TablesHeader;
