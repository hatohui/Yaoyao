"use client";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";

export type FormMessage = {
  message: string;
  code?: string;
  type: "error" | "success" | "info";
};

const useNotify = () => {
  const tErrors = useTranslations("errors");
  const tCommon = useTranslations("common");
  const tSuccess = useTranslations("success");
  const [message, setMessage] = useState<FormMessage | null>(null);

  const setFormMessage = useCallback(
    (
      type: "error" | "success" | "info",
      code?: string,
      fallbackMessage?: string
    ) => {
      if (!code && !fallbackMessage) {
        setMessage(null);
        return;
      }

      let translatedMessage = fallbackMessage || tCommon("error");
      if (code) {
        if (type === "error") {
          translatedMessage = tErrors(code);
        } else if (type === "success") {
          translatedMessage = tSuccess(code);
        } else {
          translatedMessage = tCommon(code);
        }
      }

      setMessage({ message: translatedMessage, code, type });
    },
    [tErrors, tCommon, tSuccess]
  );

  const setError = useCallback(
    (code?: string, fallbackMessage?: string) => {
      setFormMessage("error", code, fallbackMessage);
    },
    [setFormMessage]
  );

  const setSuccess = useCallback(
    (code?: string, fallbackMessage?: string) => {
      setFormMessage("success", code, fallbackMessage);
    },
    [setFormMessage]
  );

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return {
    message,
    error: message?.type === "error" ? message : null,
    success: message?.type === "success" ? message : null,
    setError,
    setSuccess,
    clearMessage,
    // Keep old API for backward compatibility
    clearError: clearMessage,
  };
};

export default useNotify;
