"use client";
import TableHeader from "@/components/table/TableHeader";
import TableMap from "@/components/table/TableMap";
import { TABLE_PUBLIC_ENABLED } from "@/config/app";
import { useTranslations } from "next-intl";
import React from "react";

const TablePage = () => {
  const t = useTranslations("tables");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <TableHeader />

      {/* Main Content */}
      {TABLE_PUBLIC_ENABLED ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TableMap />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500"> {t("noTables")}</p>
        </div>
      )}
    </div>
  );
};

export default TablePage;
