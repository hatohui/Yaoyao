"use client";
import { useCreateFeedback } from "@/hooks/feedback/useFeedback";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FiMessageSquare, FiSend } from "react-icons/fi";
import { toast } from "sonner";

const FeedbackBox = () => {
  const t = useTranslations("feedback");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const createFeedback = useCreateFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast.error(t("fillAllFields"));
      return;
    }

    createFeedback.mutate(
      {
        by: name.trim(),
        content: message.trim(),
      },
      {
        onSuccess: () => {
          toast.success(t("feedbackSubmitted"));
          setName("");
          setMessage("");
        },
        onError: () => {
          toast.error(t("feedbackError"));
        },
      }
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/10 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-darkest to-darkest/90 dark:from-slate-900 dark:to-slate-900/90 px-4 py-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FiMessageSquare className="w-5 h-5" />
          {t("title")}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {t("subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="feedback-name"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              {t("nameLabel")} *
            </label>
            <input
              id="feedback-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-main focus:border-transparent"
              disabled={createFeedback.isPending}
            />
          </div>

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
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-main focus:border-transparent resize-none"
              disabled={createFeedback.isPending}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createFeedback.isPending}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-main hover:bg-main/90 dark:bg-main dark:hover:bg-main/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend className="w-4 h-4" />
            {createFeedback.isPending ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackBox;
