"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";

type TableCardHeaderProps = {
  tableName: string;
  peopleCount: number;
  capacity: number;
  isFull: boolean;
  occupancyPercentage: number;
  isStaging?: boolean;
  referenceId?: string | null;
  onChangeName?: (newName: string) => void;
};

const TableCardHeader = ({
  tableName,
  peopleCount,
  capacity,
  isFull,
  occupancyPercentage,
  isStaging,
  referenceId,
  onChangeName,
}: TableCardHeaderProps) => {
  const t = useTranslations("tables");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(tableName);

  const handleSaveName = () => {
    if (onChangeName && newName.trim() && newName !== tableName) {
      onChangeName(newName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setNewName(tableName);
    setIsEditingName(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveName();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isEditingName ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-2 py-1 text-lg font-semibold bg-white dark:bg-slate-800 border border-main rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-main"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/30 rounded transition-all cursor-pointer"
                title={t("save")}
              >
                <FiCheck className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 rounded transition-all cursor-pointer"
                title={t("cancel")}
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                {tableName}
              </h3>
              {onChangeName && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 text-slate-400 hover:text-main hover:bg-slate-100 dark:text-slate-500 dark:hover:text-main dark:hover:bg-slate-700 rounded transition-all cursor-pointer"
                  title={t("editName")}
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              isFull
                ? "bg-red-500 dark:bg-red-600 text-white"
                : occupancyPercentage > 75
                ? "bg-amber-500 dark:bg-amber-600 text-white"
                : "bg-available dark:bg-dark-success text-white"
            }`}
          >
            {peopleCount} / {capacity}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isFull
              ? "bg-red-500"
              : occupancyPercentage > 75
              ? "bg-yellow-500"
              : "bg-main"
          }`}
          style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
        ></div>
      </div>

      {/* Reference ID for staging */}
      {isStaging && referenceId && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {t("reference")}: {referenceId}
        </p>
      )}
    </div>
  );
};

export default TableCardHeader;
