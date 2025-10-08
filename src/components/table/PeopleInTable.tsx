"use client";

import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

type PeopleInTableProps = {
  table: GetTableByIdResponse | undefined;
  people: People[] | undefined;
};

const PeopleInTable = ({ people, table }: PeopleInTableProps) => {
  const { removePeople, assignLeader } = usePeopleInTableMutation();
  const t = useTranslations("tables");

  const handleDelete = (personId: string) => {
    if (window.confirm(t("confirmRemove"))) {
      removePeople.mutate({ tableId: table?.id ?? "", personId });
    }
  };

  const handleMakeLeader = (personId: string) => {
    if (window.confirm(t("confirmMakeLeader"))) {
      assignLeader.mutate({ tableId: table?.id ?? "", personId });
    }
  };

  const currentCount = people?.length ?? 0;
  const capacity = table?.capacity ?? 0;
  const isFull = currentCount >= capacity;
  const occupancyPercentage =
    capacity > 0 ? (currentCount / capacity) * 100 : 0;

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      {/* Compact Header */}
      <div className="bg-slate-600 px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
            {t("partyMembers")}
            {isFull && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-red-500 text-white rounded">
                {t("full")}
              </span>
            )}
          </h2>
          <div className="text-white text-sm">
            <span className="font-bold">{currentCount}</span>
            <span className="opacity-90"> / {capacity}</span>
          </div>
        </div>

        {/* Occupancy Bar */}
        <div className="mt-2">
          <div className="w-full bg-slate-500 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isFull
                  ? "bg-red-400"
                  : occupancyPercentage > 75
                  ? "bg-yellow-400"
                  : "bg-green-400"
              }`}
              style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {!people || people.length === 0 ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-slate-900 mb-1">
              {t("noGuests")}
            </h3>
            <p className="text-xs text-slate-600">{t("noGuestsMessage")}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {people.map((person) => {
              const isLeader = person.id === table?.tableLeader?.id;
              return (
                <div
                  key={person.id}
                  className={`flex items-center justify-between p-3 rounded-md border transition-all ${
                    isLeader
                      ? "border-yellow-300 bg-yellow-50"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Avatar */}
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white text-xs ${
                        isLeader ? "bg-yellow-500" : "bg-blue-600"
                      }`}
                    >
                      {person.name?.charAt(0).toUpperCase() ?? "?"}
                    </div>

                    {/* Person Info */}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-900">
                          {person.name}
                        </span>
                        {isLeader && (
                          <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-semibold bg-yellow-500 text-white rounded">
                            <svg
                              className="w-2.5 h-2.5 mr-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {t("leader")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">
                        {isLeader ? t("leader") : t("guest")}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => !isLeader && handleMakeLeader(person.id)}
                      disabled={isLeader}
                      title={
                        isLeader ? t("alreadyLeader") : t("makeLeaderPrompt")
                      }
                      className={`p-1.5 text-xs font-medium rounded-md transition-all ${
                        isLeader
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDelete(person.id)}
                      className="p-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-all flex items-center"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleInTable;
