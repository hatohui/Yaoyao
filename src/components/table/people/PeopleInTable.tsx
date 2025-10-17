"use client";

import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";
import { FiUsers, FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import TableLeaderTag from "../../tags/TableLeaderTag";
import DeleteButton from "../buttons/DeleteButton";
import MakeLeaderButton from "../buttons/MakeLeaderButton";

type PeopleInTableProps = {
  table: GetTableByIdResponse | undefined;
  people: People[] | undefined;
  canManage?: boolean;
  tableId?: string;
  userId?: string | null;
};

const PeopleInTable = ({
  people,
  table,
  canManage = false,
  tableId,
  userId,
}: PeopleInTableProps) => {
  const { removePeople, assignLeader, removeLeader, addPeople } =
    usePeopleInTableMutation();
  const t = useTranslations("tables");
  const { isVerified } = useYaoAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [isAddingMember, setIsAddingMember] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (contentRef.current) {
      if (isCollapsed) {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      } else {
        // Get the natural height
        const element = contentRef.current;
        gsap.set(element, { height: "auto" });
        const height = element.offsetHeight;
        gsap.fromTo(
          element,
          { height: 0, opacity: 0 },
          { height: height, opacity: 1, duration: 0.3, ease: "power2.inOut" }
        );
        gsap.set(element, { height: "auto", delay: 0.3 });
      }
    }
  }, [isCollapsed]);

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

  const handleDemoteLeader = () => {
    if (window.confirm(t("confirmDemoteLeader"))) {
      removeLeader.mutate({ tableId: table?.id ?? "" });
    }
  };

  const handleAddMember = () => {
    if (!newMemberName.trim() || !tableId) return;

    addPeople.mutate(
      { tableId, name: newMemberName.trim(), userId: userId || undefined },
      {
        onSuccess: () => {
          setNewMemberName("");
          setIsAddingMember(false);
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddMember();
    } else if (e.key === "Escape") {
      setIsAddingMember(false);
      setNewMemberName("");
    }
  };

  const currentCount = people?.length ?? 0;
  const capacity = table?.capacity ?? 0;
  const isFull = currentCount >= capacity;
  const occupancyPercentage =
    capacity > 0 ? (currentCount / capacity) * 100 : 0;
  const canAddMember = canManage && !isFull;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-main/10 dark:border-slate-700">
      <div
        className="bg-darkest dark:bg-slate-900 px-4 py-2.5 cursor-pointer hover:bg-darkest/90 dark:hover:bg-slate-900/90 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
            {t("partyMembers")}
            {isFull && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-red-500 text-white rounded">
                {t("full")}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            <div className="text-white text-sm">
              <span className="font-bold">{currentCount}</span>
              <span className="opacity-90"> / {capacity}</span>
            </div>
            {isCollapsed ? (
              <FiChevronDown className="w-4 h-4 text-white" />
            ) : (
              <FiChevronUp className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
        <div className="mt-2">
          <div className="w-full bg-darkest/50 dark:bg-slate-950/50 rounded-full h-1.5 overflow-hidden">
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
      <div ref={contentRef} className="overflow-hidden">
        <div className="p-4 max-h-[400px] min-h-[300px] overflow-y-auto">
          <div className="space-y-2">
            {/* Member List */}
            {people && people.length > 0 ? (
              people.map((person) => {
                const isLeader = person.id === table?.tableLeader?.id;
                return (
                  <div
                    key={person.id}
                    className={`flex items-center justify-between p-3 rounded-md border transition-all ${
                      isLeader
                        ? "border-yellow-300 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600"
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
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
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
                        {isVerified && !isLeader && (
                          <MakeLeaderButton
                            isLeader={isLeader}
                            handleMakeLeader={handleMakeLeader}
                            person={person}
                          />
                        )}
                        {isVerified && isLeader && (
                          <button
                            onClick={handleDemoteLeader}
                            title={t("demoteLeader")}
                            className="p-1.5 text-xs font-medium rounded-md transition-all bg-yellow-500 hover:bg-yellow-600 text-white"
                          >
                            <FiUsers className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {(isVerified || (canManage && !isLeader)) && (
                          <DeleteButton
                            handleDelete={handleDelete}
                            person={person}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 mb-3">
                  <FiUsers className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
                  {t("noGuests")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {t("noGuestsMessage")}
                </p>
              </div>
            )}

            {/* Add Member Card */}
            {canAddMember &&
              (isAddingMember ? (
                <div className="flex items-center gap-2 p-3 rounded-md border-2 border-dashed border-main/50 dark:border-main/40 bg-main/5 dark:bg-main/10">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-main/20 dark:bg-main/30 flex-shrink-0">
                    <FiPlus className="w-4 h-4 text-main" />
                  </div>
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onBlur={() => {
                      if (!newMemberName.trim()) {
                        setIsAddingMember(false);
                      }
                    }}
                    placeholder={t("addMemberPlaceholder")}
                    className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
                    autoFocus
                    disabled={addPeople.isPending}
                  />
                  {addPeople.isPending && (
                    <div className="w-4 h-4 border-2 border-main border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingMember(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-md border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:border-main hover:bg-main/5 dark:hover:bg-main/10 transition-all group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 group-hover:bg-main/20 dark:group-hover:bg-main/30 transition-colors">
                    <FiPlus className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-main transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-main transition-colors">
                    {t("addMemberCard")}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleInTable;
