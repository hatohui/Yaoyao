"use client";
import { useGetFeedback } from "@/hooks/feedback/useFeedback";
import { useTranslations } from "next-intl";
import React from "react";
import { FiMessageSquare, FiCalendar } from "react-icons/fi";

const FeedbackList = () => {
  const t = useTranslations("feedback");
  const { data, isLoading } = useGetFeedback();
  const feedback = data?.feedback || [];

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
          <span className="text-lg font-medium text-slate-600 dark:text-slate-400">
            {t("loading")}
          </span>
        </div>
      </div>
    );
  }

  if (feedback.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 mb-6">
            <FiMessageSquare className="w-10 h-10 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            {t("noFeedback")}
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400">
            {t("noFeedbackMessage")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {feedback.map((item) => (
        <div
          key={item.id}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-xl hover:border-main/30 dark:hover:border-main/30 transition-all group"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-main/10 to-main/20 dark:from-main/20 dark:to-main/30 group-hover:from-main/20 group-hover:to-main/30 transition-colors">
              <FiMessageSquare className="w-5 h-5 text-main dark:text-main" />
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <FiCalendar className="w-4 h-4" />
              <span className="font-medium">
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

          {/* Content */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-900/30 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-base text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
