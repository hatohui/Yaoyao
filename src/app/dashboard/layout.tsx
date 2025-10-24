"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { notFound } from "next/navigation";
import { FiTable, FiShoppingBag, FiUsers, FiGrid } from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";
import DashboardSidebar from "@/components/dashboard/sidenav/DashboardSidebar";
import DashboardSwipeDetector from "@/components/dashboard/sidenav/DashboardSwipeDetector";
import Loading from "@/components/common/Loading";

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

  const [loading, setLoading] = useState(false);

  const handleOnClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
      title: t("layoutManagement") || "Layout",
      href: "/dashboard/layout",
      icon: FiGrid,
      description: t("layoutManagementDesc") || "Manage restaurant layout",
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
  ];

  const isActive = (href: string): boolean => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <div className="nav-spacer h-screen flex overflow-hidden bg-slate-50 dark:bg-slate-900">
      <DashboardSwipeDetector
        isOpen={isSidebarOpen}
        onSwipeRight={() => setIsSidebarOpen(true)}
        onSwipeLeft={() => setIsSidebarOpen(false)}
      />

      <DashboardSidebar
        isOpen={isSidebarOpen}
        handleOnClick={handleOnClick}
        isCollapsed={isCollapsed}
        navItems={navItems}
        isActive={isActive}
        setIsCollapsed={setIsCollapsed}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 anti-nav flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
    </div>
  );
}
