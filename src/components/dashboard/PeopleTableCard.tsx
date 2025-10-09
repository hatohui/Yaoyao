"use client";
import React, { useRef } from "react";
import { FiUsers, FiStar, FiAlertCircle } from "react-icons/fi";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useAnimations } from "@/hooks/common/useAnimations";

type PeopleTableCardProps = {
  tableName: string;
  tableId: string;
  people: Array<People & { isLeader: boolean; isDuplicate: boolean }>;
  capacity: number;
};

const PeopleTableCard = ({
  tableName,
  people,
  capacity,
}: PeopleTableCardProps) => {
  const tTables = useTranslations("tables");
  const cardRef = useRef<HTMLDivElement>(null);
  const animations = useAnimations();

  const peopleCount = people.length;
  const isFull = peopleCount >= capacity;
  const occupancyPercentage = capacity > 0 ? (peopleCount / capacity) * 100 : 0;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => animations.hoverScale(cardRef.current, 1.02)}
      onMouseLeave={() => animations.hoverScaleReset(cardRef.current)}
      className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden transition-shadow"
    >
      {/* Header */}
      <div className="bg-darkest px-4 py-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">{tableName}</h3>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                isFull
                  ? "bg-red-500 text-white"
                  : occupancyPercentage > 75
                  ? "bg-amber-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {peopleCount} / {capacity}
            </span>
          </div>
        </div>
        {/* Capacity Bar */}
        <div className="mt-2">
          <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isFull
                  ? "bg-red-400"
                  : occupancyPercentage > 75
                  ? "bg-amber-400"
                  : "bg-green-400"
              }`}
              style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* People List */}
      <div className="p-3">
        {people.length === 0 ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 mb-2">
              <FiUsers className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-600">
              {tTables("noGuests") || "No guests yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {people.map((person) => (
              <div
                key={person.id}
                className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all ${
                  person.isLeader
                    ? "border-yellow-300 bg-yellow-50"
                    : person.isDuplicate
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white text-xs flex-shrink-0 ${
                    person.isLeader
                      ? "bg-yellow-500"
                      : person.isDuplicate
                      ? "bg-red-500"
                      : "bg-main"
                  }`}
                >
                  {person.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-slate-900 truncate">
                      {person.name}
                    </span>
                    {person.isLeader && (
                      <FiStar className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                    )}
                    {person.isDuplicate && (
                      <FiAlertCircle className="w-3 h-3 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    {person.isLeader
                      ? tTables("leader") || "Table Leader"
                      : tTables("guest") || "Member"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleTableCard;
