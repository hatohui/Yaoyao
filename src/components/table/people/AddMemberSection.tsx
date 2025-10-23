"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiUserPlus, FiLoader } from "react-icons/fi";

type AddMemberSectionProps = {
  isAddingMember: boolean;
  newMemberName: string;
  canAddMember: boolean;
  isPending: boolean;
  onChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onAddClick: () => void;
};

const AddMemberSection = ({
  isAddingMember,
  newMemberName,
  canAddMember,
  isPending,
  onChange,
  onKeyPress,
  onBlur,
  onAddClick,
}: AddMemberSectionProps) => {
  const t = useTranslations("tables");

  if (isAddingMember) {
    return (
      <input
        type="text"
        value={newMemberName}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        placeholder={t("enterMemberName")}
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-main border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
        autoFocus
        disabled={isPending}
      />
    );
  }

  return (
    <button
      onClick={onAddClick}
      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all border border-dashed disabled:opacity-50 disabled:cursor-not-allowed border-main text-main hover:bg-main hover:text-white dark:hover:bg-main dark:hover:text-white"
      disabled={!canAddMember || isPending}
    >
      {isPending ? (
        <>
          <FiLoader className="w-4 h-4 animate-spin" />
          {t("adding")}
        </>
      ) : (
        <>
          <FiUserPlus className="w-4 h-4" />
          {t("addMember")}
        </>
      )}
    </button>
  );
};

export default AddMemberSection;
