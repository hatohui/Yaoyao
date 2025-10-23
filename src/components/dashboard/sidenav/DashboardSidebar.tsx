import React from "react";
import { IconType } from "react-icons";
import DashboardSidebarHeader from "@/components/dashboard/sidenav/DashboardSidebarHeader";
import DashboardSidebarNav from "@/components/dashboard/sidenav/DashboardSidebarNav";
import DashboardSidebarFooter from "@/components/dashboard/sidenav/DashboardSidebarFooter";

export interface NavItem {
  title: string;
  href: string;
  icon: IconType;
  description: string;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  navItems: NavItem[];
  isActive: (href: string) => boolean;
  setIsCollapsed: (value: boolean) => void;
  setIsSidebarOpen: (value: boolean) => void;
  handleOnClick: () => void;
}

export default function DashboardSidebar({
  isOpen,
  isCollapsed,
  navItems,
  handleOnClick,
  isActive,
  setIsCollapsed,
  setIsSidebarOpen,
}: DashboardSidebarProps) {
  return (
    <aside
      className={`
        fixed lg:sticky top-0 left-0 anti-nav
        bg-darkest dark:bg-dark-surface text-white
        transform transition-all duration-300 ease-in-out
        z-50 lg:z-auto lg:h-[calc(100vh-4rem)] h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-20" : "lg:w-72"}
        w-72
      `}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <DashboardSidebarHeader
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <DashboardSidebarNav
          handleOnClick={handleOnClick}
          navItems={navItems}
          isActive={isActive}
          isCollapsed={isCollapsed}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <DashboardSidebarFooter isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
