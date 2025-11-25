"use client";
import React from "react";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";
import { FiUsers, FiLoader } from "react-icons/fi";
import TableLeaderTag from "../../tags/TableLeaderTag";
import DeleteButton from "../buttons/DeleteButton";
import MakeLeaderButton from "../buttons/MakeLeaderButton";

type PersonCardProps = {
  person: People;
  isLeader: boolean;
  canManage: boolean;
  isYaoyao: boolean;
  onMakeLeader: (personId: string) => void;
  onDemoteLeader: () => void;
  onDelete: (personId: string) => void;
  isAssigningLeader?: boolean;
  isRemovingLeader?: boolean;
  isDeleting?: boolean;
};

const PersonCard = ({
  person,
  isLeader,
  canManage,
  isYaoyao,
  onMakeLeader,
  onDemoteLeader,
  onDelete,
  isAssigningLeader = false,
  isRemovingLeader = false,
  isDeleting = false,
}: PersonCardProps) => {
  const t = useTranslations("tables");

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-md border transition-all ${
        isLeader
          ? "border-yellow-300 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20"
          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white text-xs flex-shrink-0 ${
            isLeader ? "bg-yellow-500" : "bg-main"
          }`}
        >
          {person.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {person.name}
            </span>
            {isLeader && <TableLeaderTag />}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {isLeader ? t("leader") : t("guest")}
          </p>
        </div>
      </div>
      {canManage && (
        <div className="flex items-center gap-1.5">
          {isYaoyao && !isLeader && (
            <MakeLeaderButton
              isLeader={isLeader}
              handleMakeLeader={onMakeLeader}
              person={person}
              isPending={isAssigningLeader}
            />
          )}
          {isYaoyao && isLeader && (
            <button
              onClick={onDemoteLeader}
              disabled={isRemovingLeader}
              title={t("demoteLeader")}
              className="p-1.5 text-xs font-medium rounded-md transition-all bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRemovingLeader ? (
                <FiLoader className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FiUsers className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          {(isYaoyao || (canManage && !isLeader)) && (
            <DeleteButton
              handleDelete={onDelete}
              person={person}
              isPending={isDeleting}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PersonCard;
