"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FiCheckCircle } from "react-icons/fi";
import useStagingMutations from "@/hooks/staging/useStagingMutations";
import ConfirmDialog from "./ConfirmDialog";
import StagingActionButtons from "./StagingActionButtons";
import StagingWarningBanner from "./StagingWarningBanner";

type StagingControlsProps = {
  onSwitchToProduction?: () => void;
};

const StagingControls = ({ onSwitchToProduction }: StagingControlsProps) => {
  const t = useTranslations("staging");
  const { copyProductionToStaging, clearStaging, commitStagingToProduction } =
    useStagingMutations();

  const [copyDialog, setCopyDialog] = useState(false);
  const [clearDialog, setClearDialog] = useState(false);
  const [commitDialog, setCommitDialog] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Show success banner when mutations succeed
  useEffect(() => {
    if (copyProductionToStaging.isSuccess) {
      setSuccessMessage(t("copySuccess"));
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 3000);
    }
  }, [copyProductionToStaging.isSuccess, t]);

  useEffect(() => {
    if (clearStaging.isSuccess) {
      setSuccessMessage(t("clearSuccess"));
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 3000);
    }
  }, [clearStaging.isSuccess, t]);

  useEffect(() => {
    if (commitStagingToProduction.isSuccess) {
      setSuccessMessage(t("commitSuccess"));
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 3000);
    }
  }, [commitStagingToProduction.isSuccess, t]);

  const handleCopy = () => {
    copyProductionToStaging.mutate();
    setCopyDialog(false);
  };

  const handleClear = () => {
    setClearDialog(false);
    clearStaging.mutate();
    // Switch back to production view after clearing
    if (onSwitchToProduction) {
      setTimeout(() => onSwitchToProduction(), 1000);
    }
  };

  const handleCommit = () => {
    setCommitDialog(false);
    commitStagingToProduction.mutate();
    // Switch back to production view after committing
    if (onSwitchToProduction) {
      setTimeout(() => onSwitchToProduction(), 1000);
    }
  };

  const isLoading =
    copyProductionToStaging.isPending ||
    clearStaging.isPending ||
    commitStagingToProduction.isPending;

  return (
    <>
      {/* Success Banner */}
      {showSuccessBanner && (
        <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            {successMessage}
          </p>
        </div>
      )}

      <StagingActionButtons
        isLoading={isLoading}
        onCopy={() => setCopyDialog(true)}
        onClear={() => setClearDialog(true)}
        onCommit={() => setCommitDialog(true)}
      />

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={copyDialog}
        onClose={() => setCopyDialog(false)}
        onConfirm={handleCopy}
        title={t("copyConfirmTitle") || "Copy Production to Staging?"}
        message={
          t("copyConfirmMessage") ||
          "This will replace all staging tables with copies from production. Any existing staging data will be lost."
        }
        confirmText={t("copy") || "Copy"}
      />

      <ConfirmDialog
        isOpen={clearDialog}
        onClose={() => setClearDialog(false)}
        onConfirm={handleClear}
        title={t("clearConfirmTitle") || "Clear All Staging?"}
        message={
          t("clearConfirmMessage") ||
          "This will permanently delete all staging tables. This action cannot be undone."
        }
        confirmText={t("clear") || "Clear"}
        isDanger
      />

      <ConfirmDialog
        isOpen={commitDialog}
        onClose={() => setCommitDialog(false)}
        onConfirm={handleCommit}
        title={t("commitConfirmTitle") || "Commit to Production?"}
        message={
          t("commitConfirmMessage") ||
          "This will replace all production tables with staging tables. Current production data will be permanently deleted. This action cannot be undone."
        }
        confirmText={t("commit") || "Commit"}
        isDanger
      />

      <StagingWarningBanner />
    </>
  );
};

export default StagingControls;
