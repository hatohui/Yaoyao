"use client";
import React from "react";
import { FiGrid, FiList } from "react-icons/fi";

type ViewToggleProps = {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
};

const ViewToggle = ({ viewMode, onViewModeChange }: ViewToggleProps) => {
  return (
    <div className="hidden sm:flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
      <button
        onClick={() => onViewModeChange("list")}
        className={`flex items-center justify-center px-3 py-2 transition-colors ${
          viewMode === "list"
            ? "bg-main text-white"
            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
        }`}
        title="List view"
      >
        <FiList className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewModeChange("grid")}
        className={`flex items-center justify-center px-3 py-2 transition-colors border-l border-slate-200 dark:border-slate-600 ${
          viewMode === "grid"
            ? "bg-main text-white"
            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
        }`}
        title="Grid view with images"
      >
        <FiGrid className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ViewToggle;
