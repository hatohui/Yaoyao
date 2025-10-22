import React from "react";
import { FiUsers, FiStar, FiAlertCircle } from "react-icons/fi";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";

type StagingTableCardPeopleProps = {
  people: Array<People & { isLeader: boolean; isDuplicate: boolean }>;
  isFull: boolean;
};

const StagingTableCardPeople = ({
  people,
  isFull,
}: StagingTableCardPeopleProps) => {
  const tTables = useTranslations("tables");

  if (people.length === 0) {
    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 mb-2">
          <FiUsers className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-xs text-slate-600 dark:text-dark-text-secondary">
          {tTables("noGuests") || "No guests yet"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-1.5">
        {people.map((person) => (
          <div
            key={person.id}
            className={`flex items-center justify-between px-3 py-2 rounded-md ${
              person.isLeader
                ? "bg-main/10 dark:bg-main/20 border border-main/30 dark:border-main/40"
                : "bg-slate-50 dark:bg-slate-700/50"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {person.isLeader && (
                <FiStar className="w-3.5 h-3.5 text-main dark:text-dark-main flex-shrink-0" />
              )}
              <span className="text-sm font-medium text-slate-900 dark:text-dark-text truncate">
                {person.name}
              </span>
              {person.isDuplicate && (
                <FiAlertCircle
                  className="w-3.5 h-3.5 text-red-500 dark:text-dark-error flex-shrink-0"
                  title="Duplicate name in table"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Full Capacity Warning */}
      {isFull && (
        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-xs text-red-700 dark:text-dark-error text-center">
            {tTables("tableFull") || "Table is at full capacity"}
          </p>
        </div>
      )}
    </>
  );
};

export default StagingTableCardPeople;
