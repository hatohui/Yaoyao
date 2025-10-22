"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import useStagingMutations from "@/hooks/staging/useStagingMutations";
import ConfirmDialog from "./ConfirmDialog";
import StagingActionButtons from "./StagingActionButtons";
import StagingWarningBanner from "./StagingWarningBanner";

const StagingControls = () => {
  const t = useTranslations("staging");
  const { copyProductionToStaging, clearStaging, commitStagingToProduction } =
    useStagingMutations();

  const [copyDialog, setCopyDialog] = useState(false);
  const [clearDialog, setClearDialog] = useState(false);
  const [commitDialog, setCommitDialog] = useState(false);

  const handleCopy = () => {
    copyProductionToStaging.mutate();
    setCopyDialog(false);
  };

  const handleClear = () => {
    clearStaging.mutate();
    setClearDialog(false);
  };

  const handleCommit = () => {
    commitStagingToProduction.mutate();
    setCommitDialog(false);
  };

  const isLoading =
    copyProductionToStaging.isPending ||
    clearStaging.isPending ||
    commitStagingToProduction.isPending;

  return (
    <>
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
