"use client";
import React from "react";
import { useTranslations } from "next-intl";
import ToggleSwitch from "@/components/common/ToggleSwitch";

type TablesViewToggleProps = {
  isStaging: boolean;
  onToggle: (value: boolean) => void;
};

const TablesViewToggle = ({ isStaging, onToggle }: TablesViewToggleProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {t("tablesManagement") || "Tables Management"}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {isStaging
            ? t("stagingMode") || "Viewing staging tables"
            : t("productionMode") || "Viewing production tables"}
        </p>
      </div>
      <ToggleSwitch
        checked={isStaging}
        onChange={onToggle}
        label={t("stagingMode") || "Staging Mode"}
      />
    </div>
  );
};

export default TablesViewToggle;
