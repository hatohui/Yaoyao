"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { MdRestaurantMenu } from "react-icons/md";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

type DashboardSidebarHeaderProps = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  setIsSidebarOpen: (value: boolean) => void;
};

const DashboardSidebarHeader = ({
  isCollapsed,
  setIsCollapsed,
  setIsSidebarOpen,
}: DashboardSidebarHeaderProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="p-6 border-b border-main/20 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div className={`${isCollapsed ? "hidden" : "block"}`}>
          <h2 className="text-xl font-bold text-white dark:text-dark-text">
            {t("dashboard") || "Dashboard"}
          </h2>
          <p className="text-sm text-white/70 dark:text-dark-text-secondary mt-1">
            {t("managementPanel") || "Management Panel"}
          </p>
        </div>
        {isCollapsed && (
          <div className="w-full flex justify-center">
            <MdRestaurantMenu className="w-6 h-6 text-white" />
          </div>
        )}
        <div className="flex items-center gap-2">
          {/* Collapse Toggle (Desktop Only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-2 hover:bg-white/10 rounded-md transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <FiChevronRight className="w-5 h-5 text-white" />
            ) : (
              <FiChevronLeft className="w-5 h-5 text-white" />
            )}
          </button>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarHeader;
