"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FiChevronLeft } from "react-icons/fi";

type DashboardSidebarFooterProps = {
  isCollapsed: boolean;
};

const DashboardSidebarFooter = ({
  isCollapsed,
}: DashboardSidebarFooterProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="p-4 border-t border-main/20 dark:border-slate-700">
      <Link
        href="/"
        title={isCollapsed ? "Back to Home" : undefined}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-white/80 dark:text-dark-text-secondary hover:bg-white/10 dark:hover:bg-slate-700/50 hover:text-white dark:hover:text-dark-text transition-colors text-sm ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <FiChevronLeft className="w-4 h-4" />
        {!isCollapsed && <span>{t("backToHome") || "Back to Home"}</span>}
      </Link>
    </div>
  );
};

export default DashboardSidebarFooter;
