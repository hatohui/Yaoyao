"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiCheck, FiEdit2 } from "react-icons/fi";
import useForm from "@/hooks/common/useForm";
import FormMessage from "@/components/common/FormMessage";

interface CapacityFormProps {
  currentCapacity: number;
  onSubmit: (capacity: number) => void;
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

const CapacityForm = ({
  currentCapacity,
  onSubmit,
  onCancel,
  onEdit,
  isPending,
  isEditing,
  formError,
  formSuccess,
  clearError,
}: CapacityFormProps) => {
  const t = useTranslations("tables");
  const errorT = useTranslations("errors");
  const tCommon = useTranslations("common");

  const capacityForm = useForm({
    initialValue: currentCapacity.toString(),
    validate: (value) => {
      const num = Number(value);
      if (value === "" || isNaN(num) || num <= 0) {
        return t("errors.INVALID_CAPACITY");
      }
      return null;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!capacityForm.validate()) {
      return;
    }

    const capacity = Number(capacityForm.value);
    if (capacity === currentCapacity) {
      capacityForm.setError(errorT("SAME_CAPACITY"));
      return;
    }

    onSubmit(capacity);
  };

  const handleCancel = () => {
    capacityForm.reset();
    clearError?.();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="capacity"
        className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
      >
        {t("changeCapacity")}
      </label>
      <div className="relative">
        <input
          id="capacity"
          type="number"
          min="1"
          max="20"
          value={capacityForm.value}
          onChange={capacityForm.handleChange}
          disabled={!isEditing}
          className={`w-full px-3 py-1.5 pr-24 text-sm border rounded-md focus:ring-2 focus:ring-main focus:border-main transition-colors text-slate-900 dark:text-slate-100 ${
            !isEditing
              ? "bg-slate-50 dark:bg-slate-700/50 cursor-not-allowed"
              : formError || capacityForm.error
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
      {capacityForm.error && !formError && (
        <FormMessage message={capacityForm.error} type="error" />
      )}
      {formSuccess && !formError && !capacityForm.error && (
        <FormMessage message={formSuccess.message} type="success" />
      )}
      {!formError && !capacityForm.error && !formSuccess && (
        <FormMessage message={t("setCapacity")} type="info" />
      )}
    </form>
  );
};

export default CapacityForm;
