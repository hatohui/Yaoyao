"use client";
import React from "react";
import FeedbackBox from "@/components/common/FeedbackBox";
import { useTranslations } from "next-intl";
import { FiMessageSquare } from "react-icons/fi";

const FeedbackPage = () => {
  const t = useTranslations("feedback");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 nav-spacer">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-main/10 dark:bg-main/20 mb-4">
            <FiMessageSquare className="w-8 h-8 text-main dark:text-main" />
          </div>
          <h1 className="text-3xl font-bold text-darkest dark:text-white mb-2">
            {t("title")}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Feedback Box */}
        <FeedbackBox />
      </div>
    </div>
  );
};

export default FeedbackPage;
