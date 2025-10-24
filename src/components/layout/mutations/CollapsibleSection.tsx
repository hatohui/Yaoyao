"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type CollapsibleSectionProps = {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  icon?: React.ReactNode;
};

const CollapsibleSection = ({
  title,
  count,
  children,
  defaultCollapsed = false,
  icon,
}: CollapsibleSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 font-mon">
            {title}
          </span>
          {count !== undefined && (
            <span className="px-2 py-0.5 text-xs font-medium bg-main text-white rounded-full">
              {count}
            </span>
          )}
        </div>
        {isCollapsed ? (
          <FiChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        ) : (
          <FiChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        )}
      </button>
      {!isCollapsed && (
        <div className="p-3 bg-white dark:bg-slate-900 max-h-96 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
