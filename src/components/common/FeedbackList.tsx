"use client";
import { useGetFeedback } from "@/hooks/feedback/useFeedback";
import { useTranslations } from "next-intl";
import React from "react";
import { FiMessageSquare, FiUser, FiCalendar } from "react-icons/fi";

const FeedbackList = () => {
  const t = useTranslations("feedback");
  const { data, isLoading } = useGetFeedback();
  const feedback = data?.feedback || [];

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">
            {t("loading")}
          </span>
        </div>
      </div>
    );
  }

  if (feedback.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
            <FiMessageSquare className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-2">
            {t("noFeedback")}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("noFeedbackMessage")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <div
          key={item.id}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-4 hover:border-main/30 dark:hover:border-main/30 transition-colors"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-main/10 dark:bg-main/20">
                <FiUser className="w-4 h-4 text-main dark:text-main" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.by}
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <FiCalendar className="w-3 h-3" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
