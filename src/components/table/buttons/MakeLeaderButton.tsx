import { useTranslations } from "next-intl";
import React from "react";
import { FiStar } from "react-icons/fi";

const MakeLeaderButton = ({
  isLeader,
  handleMakeLeader,
  person,
}: {
  isLeader: boolean;
  handleMakeLeader: (id: string) => void;
  person: { id: string };
}) => {
  const t = useTranslations("tables");

  return (
    <button
      onClick={() => !isLeader && handleMakeLeader(person.id)}
      disabled={isLeader}
      title={isLeader ? t("alreadyLeader") : t("makeLeaderPrompt")}
      className={`p-1.5 text-xs font-medium rounded-md transition-all ${
        isLeader
          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
          : "bg-main hover:bg-main/90 text-white"
      }`}
    >
      <FiStar className="w-3.5 h-3.5" />
    </button>
  );
};

export default MakeLeaderButton;
