"use client";
import { useCreateFeedback } from "@/hooks/feedback/useFeedback";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FiMessageSquare, FiSend } from "react-icons/fi";
import { toast } from "sonner";

const FeedbackBox = () => {
  const t = useTranslations("feedback");
  const [message, setMessage] = useState("");
  const createFeedback = useCreateFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error(t("fillAllFields"));
      return;
    }

    createFeedback.mutate(
      {
        content: message.trim(),
      },
      {
        onSuccess: () => {
          toast.success(t("feedbackSubmitted"));
          setMessage("");
        },
        onError: () => {
          toast.error(t("feedbackError"));
        },
      }
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-main via-main to-main/90 dark:from-main dark:via-main dark:to-main/90 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FiMessageSquare className="w-5 h-5" />
          {t("title")}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {t("subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Message Input */}
          <div>
            <label
              htmlFor="feedback-message"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              {t("messageLabel")} *
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("messagePlaceholder")}
              rows={5}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-main focus:border-main transition-all resize-none"
              disabled={createFeedback.isPending}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createFeedback.isPending}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-main to-main/90 hover:from-main/90 hover:to-main text-white font-semibold rounded-xl shadow-lg shadow-main/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-main/30"
          >
            <FiSend className="w-5 h-5" />
            {createFeedback.isPending ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackBox;
