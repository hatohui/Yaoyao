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
        <p className="text-sm mt-1">
          {isStaging ? (
            <span className="text-yellow-600 dark:text-yellow-400 font-medium">
              {t("stagingMode") || "Viewing staging tables"}
            </span>
          ) : (
            <span className="text-green-600 dark:text-green-400 font-medium">
              {t("productionMode") || "Viewing production tables"}
            </span>
          )}
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
