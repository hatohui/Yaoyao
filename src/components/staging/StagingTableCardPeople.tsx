import React, { useState } from "react";
import {
  FiStar,
  FiAlertCircle,
  FiPlus,
  FiTrash2,
  FiUsers,
  FiLoader,
} from "react-icons/fi";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";
import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";

type StagingTableCardPeopleProps = {
  people: Array<People & { isLeader: boolean; isDuplicate: boolean }>;
  isFull: boolean;
  tableId: string;
  capacity: number;
  onMakeLeader?: (personId: string) => void;
  onDemoteLeader?: () => void;
  isAssigningLeader?: boolean;
  isRemovingLeader?: boolean;
};

const StagingTableCardPeople = ({
  people,
  isFull,
  tableId,
  capacity,
  onMakeLeader,
  onDemoteLeader,
  isAssigningLeader,
  isRemovingLeader,
}: StagingTableCardPeopleProps) => {
  const tTables = useTranslations("tables");
  const { addPeople, removePeople } = usePeopleInTableMutation();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;

    addPeople.mutate(
      { tableId, name: newMemberName.trim() },
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

  const handleDelete = (personId: string) => {
    // No confirmation dialog - directly remove (matches normal view)
    removePeople.mutate({ tableId, personId });
  };

  const canAddMember = !isFull;

  if (people.length === 0 && !isAddingMember) {
    return (
      <div className="text-center py-4 space-y-2 min-h-[160px] flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700">
          <FiUsers className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {tTables("noGuests") || "No guests yet"}
        </p>
        {canAddMember && (
          <button
            onClick={() => setIsAddingMember(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all bg-main/10 hover:bg-main/20 text-main dark:bg-main/20 dark:hover:bg-main/30"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>{tTables("addMemberCard")}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2 min-h-[160px]">
        {people.map((person) => (
          <div
            key={person.id}
            className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
              person.isLeader
                ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-900/50"
                : "bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {person.isLeader && (
                <FiStar className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
              )}
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {person.name}
              </span>
              {person.isDuplicate && (
                <FiAlertCircle
                  className="w-3.5 h-3.5 text-red-500 dark:text-red-400 flex-shrink-0"
                  title="Duplicate name in table"
                />
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {onMakeLeader && !person.isLeader && (
                <button
                  onClick={() => onMakeLeader(person.id)}
                  disabled={isAssigningLeader || isRemovingLeader}
                  title={tTables("makeLeader")}
                  className="p-1 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100 dark:text-yellow-400 dark:hover:text-yellow-300 dark:hover:bg-yellow-900/30 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAssigningLeader ? (
                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FiStar className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
              {onDemoteLeader && person.isLeader && (
                <button
                  onClick={onDemoteLeader}
                  disabled={isAssigningLeader || isRemovingLeader}
                  title={tTables("demoteLeader")}
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
                onClick={() => handleDelete(person.id)}
                disabled={removePeople.isPending}
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={tTables("remove")}
              >
                {removePeople.isPending ? (
                  <FiLoader className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FiTrash2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}

        {/* Add Member Input - with dotted lines and loading logic like normal view */}
        {isAddingMember && (
          <div className="flex items-center gap-2 p-2 rounded-md border-2 border-dashed border-main/50 dark:border-main/40 bg-main/5 dark:bg-main/10">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-main/20 dark:bg-main/30 flex-shrink-0">
              <FiPlus className="w-3.5 h-3.5 text-main" />
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
              placeholder={tTables("addMemberPlaceholder")}
              className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
              autoFocus
              disabled={addPeople.isPending}
            />
            {addPeople.isPending && (
              <div className="w-4 h-4 border-2 border-main border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        )}

        {/* Add Member Button - with dotted lines and hover effects like normal view */}
        {canAddMember && !isAddingMember && (
          <button
            onClick={() => setIsAddingMember(true)}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-md border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:border-main hover:bg-main/5 dark:hover:bg-main/10 transition-all group"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 group-hover:bg-main/20 dark:group-hover:bg-main/30 transition-colors">
              <FiPlus className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-main transition-colors" />
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-main transition-colors">
              {tTables("addMemberCard")}
            </span>
          </button>
        )}
      </div>

      {/* Full Capacity Warning */}
      {isFull && (
        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-xs text-red-700 dark:text-red-400 text-center">
            {tTables("full")} - {people.length}/{capacity}
          </p>
        </div>
      )}
    </>
  );
};

export default StagingTableCardPeople;
