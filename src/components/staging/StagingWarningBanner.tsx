import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

const StagingWarningBanner = () => {
  const t = useTranslations("staging");

  return (
    <div className="mt-4 p-4 bg-main/5 dark:bg-main/10 border border-main/20 dark:border-main/30 rounded-lg">
      <div className="flex items-start gap-3">
        <FiAlertCircle className="w-5 h-5 text-main dark:text-dark-main flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-dark-text mb-1">
            {t("warningTitle") || "Staging Environment"}
          </h4>
          <p className="text-xs text-slate-700 dark:text-dark-text-secondary">
            {t("warningMessage") ||
              "Changes in staging do not affect production until you commit. Always review staging tables before committing to production."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StagingWarningBanner;
