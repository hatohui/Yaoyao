import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FiEdit2, FiCheck, FiX, FiTrash2, FiLoader } from "react-icons/fi";
import StagingBadge from "./StagingBadge";

type StagingTableCardHeaderProps = {
  tableName: string;
  peopleCount: number;
  capacity: number;
  occupancyPercentage: number;
  isFull: boolean;
  referenceId?: string | null;
  onChangeName?: (newName: string) => void;
  onChangeCapacity?: (newCapacity: number) => void;
  onDelete?: () => void;
  isChangingName?: boolean;
  isChangingCapacity?: boolean;
  isDeleting?: boolean;
};

const StagingTableCardHeader = ({
  tableName,
  peopleCount,
  capacity,
  occupancyPercentage,
  isFull,
  referenceId,
  onChangeName,
  onChangeCapacity,
  onDelete,
  isChangingName,
  isChangingCapacity,
  isDeleting,
}: StagingTableCardHeaderProps) => {
  const t = useTranslations("tables");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingCapacity, setIsEditingCapacity] = useState(false);
  const [newName, setNewName] = useState(tableName);
  const [newCapacity, setNewCapacity] = useState(capacity.toString());

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

  const handleSaveCapacity = () => {
    const parsedCapacity = parseInt(newCapacity, 10);
    if (
      onChangeCapacity &&
      !isNaN(parsedCapacity) &&
      parsedCapacity > 0 &&
      parsedCapacity !== capacity
    ) {
      onChangeCapacity(parsedCapacity);
    }
    setIsEditingCapacity(false);
    setNewCapacity(capacity.toString());
  };

  const handleCancelCapacityEdit = () => {
    setNewCapacity(capacity.toString());
    setIsEditingCapacity(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveName();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleCapacityKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveCapacity();
    } else if (e.key === "Escape") {
      handleCancelCapacityEdit();
    }
  };
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isEditingName ? (
            <div className="flex items-center gap-2 flex-1 font-serif">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-2 py-1 text-lg font-semibold bg-white dark:bg-slate-800 border-2 border-main rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-main/50"
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
              <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-slate-100 truncate">
                {tableName}
              </h3>
              {onChangeName && (
                <button
                  onClick={() => setIsEditingName(true)}
                  disabled={isChangingName}
                  className="p-1 text-slate-400 hover:text-main hover:bg-slate-100 dark:text-slate-500 dark:hover:text-main dark:hover:bg-slate-700 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t("editName")}
                >
                  {isChangingName ? (
                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FiEdit2 className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-slate-500 dark:hover:text-red-400 dark:hover:bg-red-900/30 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t("deleteTable")}
                >
                  {isDeleting ? (
                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FiTrash2 className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
              <StagingBadge />
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditingCapacity ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                onKeyDown={handleCapacityKeyPress}
                min="1"
                className="w-16 px-2 py-0.5 text-xs font-semibold bg-white dark:bg-slate-800 border-2 border-main rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-main/50"
                autoFocus
              />
              <button
                onClick={handleSaveCapacity}
                className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/30 rounded transition-all cursor-pointer"
                title={t("save")}
              >
                <FiCheck className="w-3 h-3" />
              </button>
              <button
                onClick={handleCancelCapacityEdit}
                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 rounded transition-all cursor-pointer"
                title={t("cancel")}
              >
                <FiX className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
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
              {onChangeCapacity && (
                <button
                  onClick={() => setIsEditingCapacity(true)}
                  disabled={isChangingCapacity}
                  className="p-1 text-slate-400 hover:text-main hover:bg-slate-100 dark:text-slate-500 dark:hover:text-main dark:hover:bg-slate-700 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t("editCapacity") || "Edit capacity"}
                >
                  {isChangingCapacity ? (
                    <FiLoader className="w-3 h-3 animate-spin" />
                  ) : (
                    <FiEdit2 className="w-3 h-3" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Capacity Bar */}
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

      {/* Reference Info */}
      {referenceId && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Copied from production
        </p>
      )}
    </div>
  );
};

export default StagingTableCardHeader;
