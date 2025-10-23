"use client";
import React from "react";
import { FiCopy, FiTrash2, FiCheck, FiLoader } from "react-icons/fi";
import { useTranslations } from "next-intl";

type StagingActionButtonsProps = {
  isCopyLoading: boolean;
  isClearLoading: boolean;
  isCommitLoading: boolean;
  onCopy: () => void;
  onClear: () => void;
  onCommit: () => void;
};

const StagingActionButtons = ({
  isCopyLoading,
  isClearLoading,
  isCommitLoading,
  onCopy,
  onClear,
  onCommit,
}: StagingActionButtonsProps) => {
  const t = useTranslations("staging");
  const isAnyLoading = isCopyLoading || isClearLoading || isCommitLoading;

  return (
    <div className="flex flex-wrap gap-3">
      {/* Copy Production to Staging */}
      <button
        onClick={onCopy}
        disabled={isAnyLoading}
        className="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCopyLoading ? (
          <FiLoader className="w-4 h-4 animate-spin" />
        ) : (
          <FiCopy className="w-4 h-4" />
        )}
        {t("copyProduction") || "Copy from Production"}
      </button>

      {/* Clear Staging */}
      <button
        onClick={onClear}
        disabled={isAnyLoading}
        className="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isClearLoading ? (
          <FiLoader className="w-4 h-4 animate-spin" />
        ) : (
          <FiTrash2 className="w-4 h-4" />
        )}
        {t("clearStaging") || "Clear Staging"}
      </button>

      {/* Commit to Production */}
      <button
        onClick={onCommit}
        disabled={isAnyLoading}
        className="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCommitLoading ? (
          <FiLoader className="w-4 h-4 animate-spin" />
        ) : (
          <FiCheck className="w-4 h-4" />
        )}
        {t("commitToProduction") || "Commit to Production"}
      </button>
    </div>
  );
};

export default StagingActionButtons;
