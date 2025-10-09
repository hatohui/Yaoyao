"use client";
import { usePaymentStatusMutation } from "@/hooks/table/usePaymentStatusMutation";
import { useTranslations } from "next-intl";
import React from "react";
import { FiDollarSign, FiCheck, FiX } from "react-icons/fi";

type PaymentStatusToggleProps = {
  tableId: string;
  isPaid: boolean;
};

const PaymentStatusToggle = ({ tableId, isPaid }: PaymentStatusToggleProps) => {
  const t = useTranslations("orders");
  const mutation = usePaymentStatusMutation(tableId);

  const handleToggle = () => {
    mutation.mutate(!isPaid);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-main/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-darkest to-darkest/90 px-4 py-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FiDollarSign className="w-5 h-5" />
          {t("paymentStatus")}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-700">Current Status:</span>
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
              isPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isPaid ? t("paid") : t("unpaid")}
          </span>
        </div>

        <button
          onClick={handleToggle}
          disabled={mutation.isPending}
          className={`w-full py-2.5 px-4 rounded-md font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
            isPaid
              ? "bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300"
              : "bg-main/10 hover:bg-main/20 text-main border border-main/30"
          }`}
        >
          {isPaid ? (
            <>
              <FiX className="w-4 h-4" />
              {t("markAsUnpaid")}
            </>
          ) : (
            <>
              <FiCheck className="w-4 h-4" />
              {t("markAsPaid")}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentStatusToggle;
