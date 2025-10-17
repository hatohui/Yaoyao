"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiPlus } from "react-icons/fi";
import useForm from "@/hooks/common/useForm";
import FormMessage from "@/components/common/FormMessage";

interface AddPersonFormProps {
  onSubmit: (name: string) => void;
  isPending: boolean;
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

const AddPersonForm = ({
  onSubmit,
  isPending,
  formError,
  formSuccess,
  clearError,
}: AddPersonFormProps) => {
  const t = useTranslations("tables");

  const nameForm = useForm({
    initialValue: "",
    validate: (value) => {
      if (!value.trim()) {
        return t("enterNamePrompt");
      }
      return null;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameForm.validate()) {
      return;
    }

    clearError?.();
    onSubmit(nameForm.value);
    nameForm.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label
          htmlFor="personName"
          className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {t("personName")}
        </label>
        <div className="relative">
          <input
            id="personName"
            type="text"
            value={nameForm.value}
            onChange={nameForm.handleChange}
            placeholder={t("enterName")}
            className={`w-full px-3 py-1.5 pr-12 text-sm border rounded-md focus:ring-2 focus:ring-main focus:border-main transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
              formError || nameForm.error
                ? "border-red-500 dark:border-red-500"
                : formSuccess
                ? "border-green-500 dark:border-green-500"
                : "border-slate-300 dark:border-slate-600"
            }`}
            disabled={isPending}
          />
          {/* Send button inside input */}
          <button
            type="submit"
            disabled={isPending || !nameForm.value.trim()}
            className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-main hover:bg-main/90 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
            title={t("addPersonButton")}
          >
            {isPending ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FiPlus className="w-3 h-3" />
                <span className="hidden sm:inline">{t("addPersonButton")}</span>
              </>
            )}
          </button>
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
          <FormMessage message={t("enterNamePrompt")} type="info" />
        )}
      </div>
    </form>
  );
};

export default AddPersonForm;
