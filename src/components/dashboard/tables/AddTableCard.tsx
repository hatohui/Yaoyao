"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FiPlus } from "react-icons/fi";
import useTableMutation from "@/hooks/table/useTableMutation";

type AddTableCardProps = {
  isStaging?: boolean;
};

const AddTableCard = ({ isStaging = false }: AddTableCardProps) => {
  const t = useTranslations("tables");
  const { createTable } = useTableMutation();
  const [isCreating, setIsCreating] = useState(false);
  const [newTableName, setNewTableName] = useState("");

  const handleCreateTable = () => {
    if (!newTableName.trim()) return;

    createTable.mutate(
      { name: newTableName.trim(), capacity: 2, isStaging },
      {
        onSuccess: () => {
          setNewTableName("");
          setIsCreating(false);
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateTable();
    } else if (e.key === "Escape") {
      setIsCreating(false);
      setNewTableName("");
    }
  };

  if (isCreating) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/30 dark:border-main/40 overflow-hidden transition-all hover:shadow-lg hover:border-main/50 dark:hover:border-main/60 flex items-center justify-center">
        <div className="p-4 w-full">
          <div className="flex items-center gap-2 p-3 rounded-md border-2 border-dashed border-main/50 dark:border-main/40 bg-main/5 dark:bg-main/10">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-main/20 dark:bg-main/30 flex-shrink-0">
              <FiPlus className="w-4 h-4 text-main" />
            </div>
            <input
              type="text"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => {
                if (!newTableName.trim()) {
                  setIsCreating(false);
                }
              }}
              placeholder={t("tableName") || "Table name"}
              className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
              autoFocus
              disabled={createTable.isPending}
            />
            {createTable.isPending && (
              <div className="w-4 h-4 border-2 border-main border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsCreating(true)}
      className="w-full min-h-[160px] bg-white dark:bg-slate-800 rounded-lg shadow-md border border-dashed border-slate-300 dark:border-slate-600 overflow-hidden transition-all hover:border-main hover:shadow-lg hover:bg-main/5 h-full dark:hover:bg-main/10  flex flex-col items-center justify-center gap-3 group cursor-pointer"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-main/20 dark:group-hover:bg-main/30 transition-all">
        <FiPlus className="w-8 h-8 text-slate-400 dark:text-slate-500 group-hover:text-main transition-colors" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-main transition-colors">
          {t("addTable") || "Add Table"}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          {t("createNewTable") || "Create a new table"}
        </p>
      </div>
    </button>
  );
};

export default AddTableCard;
