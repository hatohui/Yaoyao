"use client";
import React from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

export type MessageType = "error" | "success" | "info";

interface FormMessageProps {
  message?: string | null;
  type?: MessageType;
  className?: string;
}

const FormMessage = ({
  message,
  type = "info",
  className = "",
}: FormMessageProps) => {
  if (!message) return null;

  const styles = {
    error: {
      container: "text-red-600 dark:text-red-400",
      icon: FiAlertCircle,
    },
    success: {
      container: "text-green-600 dark:text-green-400",
      icon: FiCheckCircle,
    },
    info: {
      container: "text-slate-500 dark:text-slate-400",
      icon: FiInfo,
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <p
      className={`mt-1.5 text-xs ${style.container} flex items-center gap-1.5 ${className}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{message}</span>
    </p>
  );
};

export default FormMessage;
