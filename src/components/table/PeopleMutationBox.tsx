import { ErrorMessage } from "@/common/status";
import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const PeopleMutationBox = ({ id }: { id: string }) => {
  const [name, setName] = useState("");
  const t = useTranslations("tables");
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const { addPeople } = usePeopleInTableMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatus({ type: "error", message: t("enterNamePrompt") });
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    addPeople.mutate(
      { tableId: id, name },
      {
        onSuccess: () => {
          setName("");
          setStatus({ type: "success", message: t("personAdded") });
          setTimeout(() => setStatus(null), 3000);
        },
        onError: (error: unknown) => {
          const axiosError = error as AxiosError<ErrorMessage | null>;

          if (axiosError && axiosError.isAxiosError) {
            setStatus({
              type: "error",
              message: axiosError.response?.data?.message || "Error occurred",
            });
          } else {
            setStatus({
              type: "error",
              message: (error as Error)?.message || "Error occurred",
            });
          }

          setTimeout(() => setStatus(null), 3000);
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      {/* Compact Header */}
      <div className="bg-blue-600 px-4 py-2">
        <h2 className="text-sm font-semibold text-white">{t("addPerson")}</h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="personName"
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              {t("personName")}
            </label>
            <input
              id="personName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("enterName")}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={addPeople.isPending}
            />
          </div>

          <button
            type="submit"
            disabled={addPeople.isPending || !name.trim()}
            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {addPeople.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t("addingPerson")}
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {t("addPersonButton")}
              </>
            )}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div
            className={`mt-3 p-2 rounded-md flex items-center gap-2 ${
              status.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {status.type === "success" ? (
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <span className="text-xs font-medium">{status.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleMutationBox;
