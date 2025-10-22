"use client";
import React from "react";
import { FiStar, FiTrash2 } from "react-icons/fi";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";

type TableCardPeopleListProps = {
  people: People[];
  tableLeaderId?: string;
  onDelete: (personId: string) => void;
};

const TableCardPeopleList = ({
  people,
  tableLeaderId,
  onDelete,
}: TableCardPeopleListProps) => {
  const t = useTranslations("tables");

  return (
    <>
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
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {person.name}
              </span>
            </div>
            <button
              onClick={() => onDelete(person.id)}
              className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              title={t("remove")}
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </>
  );
};

export default TableCardPeopleList;
