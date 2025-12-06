"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FiDownload, FiFileText, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";

export default function ExportPage() {
  const t = useTranslations("export");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await axios.get("/api/export/tables", {
        responseType: "blob",
      });

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Get filename from response headers or use default
      const timestamp = new Date().toISOString().split("T")[0];
      link.download = `tables-export-${timestamp}.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(t("exportSuccess") || "Export completed successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error(t("exportError") || "Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <FiFileText className="text-3xl text-main dark:text-main-light" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {t("title") || "Export to Excel"}
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
            {t("subtitle") || "Export table data to Excel"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            {t("description") ||
              "Download a comprehensive Excel file containing all table information, including layout positions, table names, number of people, and order details."}
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-lg mb-3 text-slate-700 dark:text-slate-200">
            {t("exportIncludesTitle") || "Export Includes:"}
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">
                {t("includesTableNumber") ||
                  "Table number (position in restaurant layout)"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">
                {t("includesPeople") || "Number of people at each table"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">
                {t("includesFoodItem") || "Food items ordered"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">
                {t("includesSize") || "Size/variant of each item"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">
                {t("includesQuantity") || "Quantity of each item"}
              </span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-3 px-8 py-4 bg-main hover:bg-main-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <FiDownload className="text-xl" />
            <span className="text-lg">
              {isExporting
                ? t("exporting") || "Exporting..."
                : t("exportButton") || "Export to Excel"}
            </span>
          </button>
        </div>

        <div className="mt-8 p-4 bg-main-light/10 dark:bg-main-dark/20 rounded-lg border border-main/30 dark:border-main-light/30">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>{t("note") || "Note"}:</strong>{" "}
            {t("noteText") ||
              "The export will include only active tables (non-staging tables). The file will be named with today's date."}
          </p>
        </div>
      </div>
    </div>
  );
}
