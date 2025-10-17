"use client";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useTranslations } from "next-intl";

type OrderLinkGeneratorProps = {
  tableId: string;
  tableLeaderId: string;
  tableName: string;
  simple?: boolean;
  fullWidth?: boolean; // For dashboard cards
};

const OrderLinkGenerator = ({
  tableId,
  tableLeaderId,
  tableName,
  simple = false,
  fullWidth = false,
}: OrderLinkGeneratorProps) => {
  const t = useTranslations("tables");
  const [copied, setCopied] = useState(false);

  const orderLink = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/orders?table=${tableId}&id=${tableLeaderId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return simple ? (
    <button
      onClick={handleCopy}
      className={`flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-all ${
        fullWidth
          ? "w-full px-3 py-2.5 text-xs shadow-sm hover:shadow-md"
          : "px-4 py-2 text-sm"
      } ${
        copied
          ? fullWidth
            ? "bg-green-500 text-white"
            : "bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400"
          : fullWidth
          ? "bg-main hover:bg-main/90 text-white"
          : "bg-main/10 dark:bg-main/20 hover:bg-main/20 dark:hover:bg-main/30 text-main"
      }`}
    >
      {copied ? (
        <>
          <FiCheck className={fullWidth ? "w-3.5 h-3.5" : "w-4 h-4"} />
          {fullWidth ? t("copied") : ""}
        </>
      ) : (
        <>
          <FiCopy className={fullWidth ? "w-3.5 h-3.5" : "w-4 h-4"} />
          {fullWidth ? t("copyLink") : ""}
        </>
      )}
    </button>
  ) : (
    <div className="bg-white dark:bg-slate-800 border border-main/20 dark:border-slate-700 rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        {t("orderLink") || "Order Link for"} {tableName}
      </h3>

      {/* URL Display */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 mb-3">
        <code className="text-xs text-slate-600 dark:text-slate-400 break-all">
          {orderLink}
        </code>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600"
      >
        {copied ? (
          <>
            <FiCheck className="w-4 h-4" />
            {t("copied") || "Copied!"}
          </>
        ) : (
          <>
            <FiCopy className="w-4 h-4" />
            {t("copyLink") || "Copy Link"}
          </>
        )}
      </button>
    </div>
  );
};

export default OrderLinkGenerator;
