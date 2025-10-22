"use client";
import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

type DashboardSidebarNavProps = {
  navItems: {
    title: string;
    href: string;
    icon: IconType;
    description: string;
  }[];
  isActive: (href: string) => boolean;
  isCollapsed: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const DashboardSidebarNav = ({
  navItems,
  isActive,
  isCollapsed,
  setIsSidebarOpen,
}: DashboardSidebarNavProps) => {
  return (
    <nav className="flex-1 overflow-y-auto p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              title={isCollapsed ? item.title : undefined}
              className={`
                flex items-start gap-3 px-4 py-3 rounded-lg
                transition-all duration-200 truncate text-nowrap
                ${
                  active
                    ? "bg-main dark:bg-dark-main/20 dark:border dark:border-main/40 text-white dark:text-dark-text shadow-lg"
                    : "text-white/80 dark:text-dark-text-secondary hover:bg-white/10 dark:hover:bg-slate-700/50 hover:text-white dark:hover:text-dark-text"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
            >
              <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs opacity-80 mt-0.5">
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default DashboardSidebarNav;
