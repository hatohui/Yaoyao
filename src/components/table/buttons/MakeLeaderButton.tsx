import { useTranslations } from "next-intl";
import React from "react";
import { FiStar, FiLoader } from "react-icons/fi";

const MakeLeaderButton = ({
  isLeader,
  handleMakeLeader,
  person,
  isPending = false,
}: {
  isLeader: boolean;
  handleMakeLeader: (id: string) => void;
  person: { id: string };
  isPending?: boolean;
}) => {
  const t = useTranslations("tables");

  return (
    <button
      onClick={() => !isLeader && handleMakeLeader(person.id)}
      disabled={isLeader || isPending}
      title={isLeader ? t("alreadyLeader") : t("makeLeaderPrompt")}
      className={`p-1.5 text-xs font-medium rounded-md transition-all ${
        isLeader || isPending
          ? "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
          : "bg-main hover:bg-main/90 text-white"
      }`}
    >
      {isPending ? (
        <FiLoader className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <FiStar className="w-3.5 h-3.5" />
      )}
    </button>
  );
};

export default MakeLeaderButton;
