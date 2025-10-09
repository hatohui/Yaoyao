"use client";
import React, { useState, useMemo } from "react";
import useTables from "@/hooks/table/useTables";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import Loading from "@/components/common/Loading";
import { FiUsers, FiAlertCircle, FiSearch, FiStar } from "react-icons/fi";
import { People } from "@prisma/client";
import PeopleTableCard from "@/components/dashboard/PeopleTableCard";
import {
  usePageAnimation,
  useCardStaggerAnimation,
  useStatCardsAnimation,
} from "@/hooks/common/useAnimations";

const DashboardPeoplePage = () => {
  const { isVerified } = useYaoAuth();
  const t = useTranslations("dashboard");

  const [searchQuery, setSearchQuery] = useState("");

  const { data: tables, isLoading } = useTables();

  // Collect all people from all tables
  const allPeople = useMemo(() => {
    if (!tables) return [];

    const peopleList: Array<
      People & { tableName: string; tableId: string; isLeader: boolean }
    > = [];

    tables.forEach((table) => {
      table.people?.forEach((person) => {
        peopleList.push({
          ...person,
          tableName: table.name,
          tableId: table.id,
          isLeader: person.id === table.tableLeader?.id,
        });
      });
    });

    return peopleList;
  }, [tables]);

  // Find duplicate names
  const duplicateNames = useMemo(() => {
    const nameCounts: Record<string, number> = {};
    allPeople.forEach((person) => {
      const name = person.name.toLowerCase();
      nameCounts[name] = (nameCounts[name] || 0) + 1;
    });
    return new Set(
      Object.keys(nameCounts).filter((name) => nameCounts[name] > 1)
    );
  }, [allPeople]);

  // Filter people by search query
  const filteredPeople = useMemo(() => {
    if (!searchQuery) return allPeople;

    return allPeople.filter(
      (person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.tableName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allPeople, searchQuery]);

  // Prepare tables with filtered people and duplicate info
  const tablesWithPeople = useMemo(() => {
    if (!tables) return [];

    return tables
      .map((table) => {
        // Filter people for this table based on search
        const tablePeople = table.people
          ?.filter((person) =>
            searchQuery
              ? person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                table.name.toLowerCase().includes(searchQuery.toLowerCase())
              : true
          )
          .map((person) => ({
            ...person,
            isLeader: person.id === table.tableLeader?.id,
            isDuplicate: duplicateNames.has(person.name.toLowerCase()),
          }));

        return {
          id: table.id,
          name: table.name,
          capacity: table.capacity,
          people: tablePeople || [],
        };
      })
      .filter((table) => table.people.length > 0 || !searchQuery); // Show all tables when no search
  }, [tables, searchQuery, duplicateNames]);

  // Animation refs
  const pageRef = usePageAnimation();
  const statsRef = useStatCardsAnimation([
    allPeople.length,
    allPeople.filter((p) => p.isLeader).length,
    duplicateNames.size,
  ]);
  const cardsRef = useCardStaggerAnimation([tablesWithPeople]);

  // Security: Only Yaoyao can access dashboard
  if (!isVerified) {
    return notFound();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-bold text-darkest">
            {t("peopleManagement") || "People Management"}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {t("peopleManagementDesc") ||
              "View all guests and manage table assignments"}
          </p>
        </div>
      </div>

      {/* Stats & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          {/* Total People */}
          <div
            data-stat-card
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-main/10 rounded-lg">
                <FiUsers className="w-5 h-5 text-main" />
              </div>
              <div>
                <p className="text-xs text-slate-600">
                  {t("totalPeople") || "Total People"}
                </p>
                <p
                  data-stat-number
                  className="text-xl font-bold text-slate-900"
                >
                  0
                </p>
              </div>
            </div>
          </div>

          {/* Table Leaders */}
          <div
            data-stat-card
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-yellow-100 rounded-lg">
                <FiStar className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">
                  {t("tableLeaders") || "Table Leaders"}
                </p>
                <p
                  data-stat-number
                  className="text-xl font-bold text-slate-900"
                >
                  0
                </p>
              </div>
            </div>
          </div>

          {/* Duplicates */}
          <div
            data-stat-card
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-red-100 rounded-lg">
                <FiAlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">
                  {t("duplicateNames") || "Duplicate Names"}
                </p>
                <p
                  data-stat-number
                  className="text-xl font-bold text-slate-900"
                >
                  0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t("searchPeople") || "Search by name or table..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main"
            />
          </div>

          <div className="mt-4 text-sm text-slate-600">
            {filteredPeople.length}{" "}
            {filteredPeople.length === 1
              ? t("personFound") || "person found"
              : t("peopleFound") || "people found"}
          </div>
        </div>

        {/* People List by Table */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {tablesWithPeople.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {t("noPeopleFound") || "No people found"}
              </h3>
              <p className="text-slate-600">
                {t("noPeopleMessage") || "Try adjusting your search"}
              </p>
            </div>
          ) : (
            tablesWithPeople.map((table) => (
              <div key={table.id} data-animate-card>
                <PeopleTableCard
                  tableId={table.id}
                  tableName={table.name}
                  capacity={table.capacity}
                  people={table.people}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPeoplePage;
