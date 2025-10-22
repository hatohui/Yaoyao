"use client";
import React from "react";
import { FiCopy, FiTrash2, FiCheck } from "react-icons/fi";
import { useTranslations } from "next-intl";

type StagingActionButtonsProps = {
  isLoading: boolean;
  onCopy: () => void;
  onClear: () => void;
  onCommit: () => void;
};

const StagingActionButtons = ({
  isLoading,
  onCopy,
  onClear,
  onCommit,
}: StagingActionButtonsProps) => {
  const t = useTranslations("staging");

  return (
    <div className="flex flex-wrap gap-3">
      {/* Copy Production to Staging */}
      <button
        onClick={onCopy}
        disabled={isLoading}
        className="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiCopy className="w-4 h-4" />
        {t("copyProduction") || "Copy from Production"}
      </button>

      {/* Clear Staging */}
      <button
        onClick={onClear}
        disabled={isLoading}
        className="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiTrash2 className="w-4 h-4" />
        {t("clearStaging") || "Clear Staging"}
      </button>

      {/* Commit to Production */}
      <button
        onClick={onCommit}
        disabled={isLoading}
        className="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiCheck className="w-4 h-4" />
        {t("commitToProduction") || "Commit to Production"}
      </button>
    </div>
  );
};

export default StagingActionButtons;
