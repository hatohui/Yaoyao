"use client";
import React from "react";
import FeedbackBox from "@/components/common/FeedbackBox";
import FeedbackList from "@/components/common/FeedbackList";
import { useTranslations } from "next-intl";
import { FiMessageSquare } from "react-icons/fi";

const FeedbackPage = () => {
  const t = useTranslations("feedback");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 nav-spacer">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-main to-main/80 shadow-lg shadow-main/20 mb-6">
            <FiMessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-darkest dark:text-white mb-3">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Feedback Box */}
        <div className="mb-12">
          <FeedbackBox />
        </div>

        {/* Feedback List */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
            <h2 className="text-2xl font-bold text-darkest dark:text-white">
              {t("allFeedback")}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
          </div>
          <FeedbackList />
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
