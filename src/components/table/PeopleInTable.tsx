"use client";

import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import { FiUsers, FiStar, FiTrash2 } from "react-icons/fi";
import useYaoAuth from "@/hooks/auth/useYaoAuth";

type PeopleInTableProps = {
  table: GetTableByIdResponse | undefined;
  people: People[] | undefined;
  canManage?: boolean;
};

const PeopleInTable = ({
  people,
  table,
  canManage = false,
}: PeopleInTableProps) => {
  const { removePeople, assignLeader } = usePeopleInTableMutation();
  const t = useTranslations("tables");
  const { isVerified } = useYaoAuth();

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-main/10">
      <div className="bg-darkest px-4 py-2.5">
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
        <div className="mt-2">
          <div className="w-full bg-darkest/50 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isFull
                  ? "bg-red-400"
                  : occupancyPercentage > 75
                  ? "bg-yellow-400"
                  : "bg-main"
              }`}
              style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="p-4">
        {!people || people.length === 0 ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
              <FiUsers className="w-6 h-6 text-slate-400" />
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
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white text-xs ${
                        isLeader ? "bg-yellow-500" : "bg-main"
                      }`}
                    >
                      {person.name?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-900">
                          {person.name}
                        </span>
                        {isLeader && (
                          <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-semibold bg-yellow-500 text-white rounded">
                            <FiStar className="w-2.5 h-2.5 mr-0.5" />
                            {t("leader")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">
                        {isLeader ? t("leader") : t("guest")}
                      </p>
                    </div>
                  </div>
                  {canManage && (
                    <div className="flex items-center gap-1.5">
                      {/* Star button only for Yaoyao */}
                      {isVerified && (
                        <button
                          onClick={() =>
                            !isLeader && handleMakeLeader(person.id)
                          }
                          disabled={isLeader}
                          title={
                            isLeader
                              ? t("alreadyLeader")
                              : t("makeLeaderPrompt")
                          }
                          className={`p-1.5 text-xs font-medium rounded-md transition-all ${
                            isLeader
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : "bg-main hover:bg-main/90 text-white"
                          }`}
                        >
                          <FiStar className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(person.id)}
                        className="p-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-all flex items-center"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
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
