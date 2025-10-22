"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiMenu } from "react-icons/fi";

type DashboardMobileHeaderProps = {
  setIsSidebarOpen: (value: boolean) => void;
};

const DashboardMobileHeader = ({
  setIsSidebarOpen,
}: DashboardMobileHeaderProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="lg:hidden sticky top-0 z-30 bg-darkest dark:bg-dark-surface border-b border-main/20 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-white dark:text-dark-text hover:bg-white/10 dark:hover:bg-slate-700/50 rounded-md transition-colors"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-white dark:text-dark-text">
          {t("dashboard") || "Dashboard"}
        </h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </div>
  );
};

export default DashboardMobileHeader;
