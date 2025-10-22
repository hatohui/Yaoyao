"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { notFound } from "next/navigation";
import { FiTable, FiShoppingBag, FiUsers, FiClock } from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";
import DashboardSidebarHeader from "@/components/dashboard/sidenav/DashboardSidebarHeader";
import DashboardSidebarNav from "@/components/dashboard/sidenav/DashboardSidebarNav";
import DashboardSidebarFooter from "@/components/dashboard/sidenav/DashboardSidebarFooter";
import DashboardMobileHeader from "@/components/dashboard/DashboardMobileHeader";

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

  const isActive = (href: string): boolean => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <div className="max-h-screen bg-slate-50 nav-spacer dark:bg-slate-900 flex">
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
          fixed lg:sticky top-0 left-0
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
        <div className="flex flex-col max-h-screen h-full">
          <DashboardSidebarHeader
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <DashboardSidebarNav
            navItems={navItems}
            isActive={isActive}
            isCollapsed={isCollapsed}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <DashboardSidebarFooter isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 max-h-screen flex flex-col min-w-0">
        <DashboardMobileHeader setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
