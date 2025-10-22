"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { notFound } from "next/navigation";
import {
  FiTable,
  FiShoppingBag,
  FiUsers,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
} from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isYaoyao } = useYaoAuth();
  const pathname = usePathname();
  const t = useTranslations("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isYaoyao) {
    return notFound();
  }

  const navItems = [
    {
      title: t("foodManagement") || "Food Management",
      href: "/dashboard",
      icon: MdRestaurantMenu,
      description: t("foodManagementDesc") || "Manage menu availability",
    },
    {
      title: t("tablesManagement") || "Tables",
      href: "/dashboard/tables",
      icon: FiTable,
      description: t("tablesManagementDesc") || "Manage table details",
    },
    {
      title: t("ordersManagement") || "Orders",
      href: "/dashboard/orders",
      icon: FiShoppingBag,
      description: t("ordersManagementDesc") || "View all orders",
    },
    {
      title: t("peopleManagement") || "People",
      href: "/dashboard/people",
      icon: FiUsers,
      description: t("peopleManagementDesc") || "Manage all guests",
    },
    {
      title: t("stagingManagement") || "Staging",
      href: "/dashboard/staging",
      icon: FiClock,
      description: t("stagingManagementDesc") || "Plan table arrangements",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          bg-darkest dark:bg-dark-surface text-white
          transform transition-all duration-300 ease-in-out
          z-50 lg:z-auto
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${isCollapsed ? "lg:w-20" : "lg:w-72"}
          w-72
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
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

          {/* Navigation */}
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
                      transition-all duration-200
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

          {/* Back to Home Link */}
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
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
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

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
