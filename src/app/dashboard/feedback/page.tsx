"use client";
import { notFound } from "next/navigation";
import React from "react";
import FeedbackList from "@/components/common/FeedbackList";
import { useTranslations } from "next-intl";
import { FiMessageSquare } from "react-icons/fi";
import useAuthStore from "@/stores/useAuthStore";

const FeedbackPage = () => {
  const { isYaoyao } = useAuthStore();
  const t = useTranslations("feedback");

  if (!isYaoyao) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 nav-spacer">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-main/10 dark:bg-main/20">
                <FiMessageSquare className="w-6 h-6 text-main dark:text-main" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-darkest dark:text-white">
                  {t("dashboardTitle")}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("dashboardSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <FeedbackList />
      </div>
    </div>
  );
};

export default FeedbackPage;
