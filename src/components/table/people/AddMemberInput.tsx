"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiPlus } from "react-icons/fi";

type AddMemberInputProps = {
  isAddingMember: boolean;
  newMemberName: string;
  isPending: boolean;
  onNameChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onStartAdding: () => void;
};

const AddMemberInput = ({
  isAddingMember,
  newMemberName,
  isPending,
  onNameChange,
  onKeyPress,
  onBlur,
  onStartAdding,
}: AddMemberInputProps) => {
  const t = useTranslations("tables");

  if (isAddingMember) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-md border-2 border-dashed border-main/50 dark:border-main/40 bg-main/5 dark:bg-main/10">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-main/20 dark:bg-main/30 flex-shrink-0">
          <FiPlus className="w-4 h-4 text-main" />
        </div>
        <input
          type="text"
          value={newMemberName}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyDown={onKeyPress}
          onBlur={onBlur}
          placeholder={t("addMemberPlaceholder")}
          className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
          autoFocus
          disabled={isPending}
        />
        {isPending && (
          <div className="w-4 h-4 border-2 border-main border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onStartAdding}
      className="w-full flex items-center justify-center gap-2 p-3 rounded-md border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:border-main hover:bg-main/5 dark:hover:bg-main/10 transition-all group"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 group-hover:bg-main/20 dark:group-hover:bg-main/30 transition-colors">
        <FiPlus className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-main transition-colors" />
      </div>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-main transition-colors">
        {t("addMemberCard")}
      </span>
    </button>
  );
};

export default AddMemberInput;
