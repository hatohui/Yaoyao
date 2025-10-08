"use client";
import TableHeader from "@/components/table/TableHeader";
import TableMap from "@/components/table/TableMap";
import { TABLE_PUBLIC_ENABLED } from "@/config/app";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import React from "react";

const TablePage = () => {
  const t = useTranslations("tables");
  const { isVerified } = useYaoAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <TableHeader />

      {/* Main Content */}
      {TABLE_PUBLIC_ENABLED || isVerified ? (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          <TableMap />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          <p className="text-center text-gray-500 text-sm sm:text-base">
            {" "}
            {t("noTables")}
          </p>
        </div>
      )}
    </div>
  );
};

export default TablePage;
