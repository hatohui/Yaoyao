"use client";
import React from "react";
import { FiStar, FiTrash2, FiUsers, FiLoader } from "react-icons/fi";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";

type TableCardPeopleListProps = {
  people: People[];
  tableLeaderId?: string;
  onDelete: (personId: string) => void;
  onMakeLeader?: (personId: string) => void;
  onDemoteLeader?: () => void;
  isAssigningLeader?: boolean;
  isRemovingLeader?: boolean;
  isDeleting?: boolean;
};

const TableCardPeopleList = ({
  people,
  tableLeaderId,
  onDelete,
  onMakeLeader,
  onDemoteLeader,
  isAssigningLeader = false,
  isRemovingLeader = false,
  isDeleting = false,
}: TableCardPeopleListProps) => {
  const t = useTranslations("tables");
  const isMutating = isAssigningLeader || isRemovingLeader || isDeleting;

  return (
    <>
      <div
        className={`relative ${
          isMutating ? "opacity-60" : ""
        } transition-opacity space-y-2`}
      >
        {people.map((person) => {
          const isLeader = tableLeaderId === person.id;
          return (
            <div
              key={person.id}
              className={`flex items-center justify-between px-3 py-2 rounded-md ${
                isLeader
                  ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-900/50"
                  : "bg-slate-50 dark:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {isLeader && (
                  <FiStar className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                )}
                <span className="text-sm font-medium max-w-md text-slate-900 dark:text-slate-100 truncate">
                  {person.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {onMakeLeader && !isLeader && (
                  <button
                    onClick={() => onMakeLeader(person.id)}
                    disabled={isAssigningLeader || isRemovingLeader}
                    title={t("makeLeader")}
                    className="p-1 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100 dark:text-yellow-400 dark:hover:text-yellow-300 dark:hover:bg-yellow-900/30 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAssigningLeader ? (
                      <FiLoader className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FiStar className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
                {onDemoteLeader && isLeader && (
                  <button
                    onClick={onDemoteLeader}
                    disabled={isAssigningLeader || isRemovingLeader}
                    title={t("demoteLeader")}
                    className="p-1 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100 dark:text-yellow-400 dark:hover:text-yellow-300 dark:hover:bg-yellow-900/30 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRemovingLeader ? (
                      <FiLoader className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FiUsers className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => onDelete(person.id)}
                  disabled={isDeleting}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t("remove")}
                >
                  {isDeleting ? (
                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FiTrash2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TableCardPeopleList;
