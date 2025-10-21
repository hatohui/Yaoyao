"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiCheck, FiEdit2 } from "react-icons/fi";
import useForm from "@/hooks/common/useForm";
import FormMessage from "@/components/common/FormMessage";

interface TableNameFormProps {
  currentName: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
  onEdit?: () => void;
  isPending: boolean;
  isEditing: boolean;
  formError?: {
    message: string;
    code?: string;
    type: "error" | "success" | "info";
  } | null;
  formSuccess?: {
    message: string;
    code?: string;
    type: "error" | "success" | "info";
  } | null;
  clearError?: () => void;
}

const TableNameForm = ({
  currentName,
  onSubmit,
  onCancel,
  onEdit,
  isPending,
  isEditing,
  formError,
  formSuccess,
  clearError,
}: TableNameFormProps) => {
  const t = useTranslations("tables");
  const errorT = useTranslations("errors");
  const tCommon = useTranslations("common");

  const nameForm = useForm({
    initialValue: currentName,
    validate: (value) => {
      const trimmed = value.trim();
      if (trimmed === "") {
        return t("errors.EMPTY_NAME");
      }
      if (trimmed.length < 2) {
        return t("errors.NAME_TOO_SHORT");
      }
      if (trimmed.length > 50) {
        return t("errors.NAME_TOO_LONG");
      }
      return null;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameForm.validate()) {
      return;
    }

    const trimmedName = nameForm.value.trim();
    if (trimmedName === currentName) {
      nameForm.setError(errorT("SAME_NAME"));
      return;
    }

    onSubmit(trimmedName);
  };

  const handleCancel = () => {
    nameForm.reset();
    clearError?.();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="tableName"
        className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
      >
        {t("changeTableName")}
      </label>
      <div className="relative">
        <input
          id="tableName"
          type="text"
          value={nameForm.value}
          onChange={nameForm.handleChange}
          disabled={!isEditing}
          placeholder={t("enterTableName")}
          className={`w-full px-3 py-1.5 pr-24 text-sm border rounded-md focus:ring-2 focus:ring-main focus:border-main transition-colors text-slate-900 dark:text-slate-100 ${
            !isEditing
              ? "bg-slate-50 dark:bg-slate-700/50 cursor-not-allowed"
              : formError || nameForm.error
              ? "border-red-500 dark:border-red-500 bg-white dark:bg-slate-700"
              : formSuccess
              ? "border-green-500 dark:border-green-500 bg-white dark:bg-slate-700"
              : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          }`}
        />
        {/* Buttons inside/next to input */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
          {!isEditing && onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="px-2 py-1 bg-main hover:bg-main/90 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
            >
              <FiEdit2 className="w-3 h-3" />
              <span className="hidden sm:inline">{tCommon("edit")}</span>
            </button>
          )}
          {isEditing && (
            <>
              <button
                type="submit"
                disabled={isPending}
                className="px-2 py-1 bg-main hover:bg-main/90 disabled:bg-main/50 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
                title={tCommon("save")}
              >
                {isPending ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FiCheck className="w-3 h-3" />
                    <span className="hidden sm:inline">{tCommon("save")}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="px-2 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded transition-colors"
                title={tCommon("cancel")}
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      {formError && <FormMessage message={formError.message} type="error" />}
      {nameForm.error && !formError && (
        <FormMessage message={nameForm.error} type="error" />
      )}
      {formSuccess && !formError && !nameForm.error && (
        <FormMessage message={formSuccess.message} type="success" />
      )}
      {!formError && !nameForm.error && !formSuccess && (
        <FormMessage message={t("setTableName")} type="info" />
      )}
    </form>
  );
};

export default TableNameForm;
