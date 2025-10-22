"use client";
import React, { useMemo } from "react";
import useTablesWithPeople from "@/hooks/table/useTableWithPeople";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { notFound, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import { FiUsers, FiAlertCircle, FiStar } from "react-icons/fi";
import { People } from "@prisma/client";
import PeopleTableCard from "@/components/dashboard/PeopleTableCard";
import SearchBar from "@/components/common/SearchBar";

const DashboardPeoplePage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("dashboard");
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";

  const { data: tables, isLoading } = useTablesWithPeople();

  // Collect all people from all tables
  const allPeople = useMemo(() => {
    if (!tables) return [];

    const peopleList: Array<
      People & { tableName: string; tableId: string; isLeader: boolean }
    > = [];

    tables.forEach((table) => {
      table?.people?.forEach((person) => {
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

  const tablesWithPeople = useMemo(() => {
    if (!tables) return [];

    return tables
      .map((table) => {
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
      .filter((table) => table.people.length > 0 || !searchQuery);
  }, [tables, searchQuery, duplicateNames]);

  // Security: Only Yaoyao can access dashboard
  if (!isYaoyao) {
    return notFound();
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col flex-1 overflow-hidden">
          {/* Stats - Fixed at top */}
          <div className="mb-6 flex-shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Total People */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-main/10 dark:bg-main/20 rounded-lg">
                    <FiUsers className="w-5 h-5 text-main" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {t("totalPeople") || "Total People"}
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {allPeople.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Table Leaders */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg">
                    <FiStar className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {t("tableLeaders") || "Table Leaders"}
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {allPeople.filter((p) => p.isLeader).length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Duplicates */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-100 dark:bg-red-900/40 rounded-lg">
                    <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {t("duplicateNames") || "Duplicate Names"}
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {duplicateNames.size}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="p-4">
                <SearchBar
                  placeholder={
                    t("searchPeople") || "Search by name or table..."
                  }
                />

                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {filteredPeople.length}
                    </span>{" "}
                    {filteredPeople.length === 1
                      ? t("personFound") || "person found"
                      : t("peopleFound") || "people found"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* People List - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Loading />
              </div>
            ) : (
              <div className="pb-6">
                {tablesWithPeople.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 py-12 text-center">
                    <FiUsers className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      {t("noPeopleFound") || "No people found"}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {t("noPeopleMessage") || "Try adjusting your search"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tablesWithPeople.map((table) => (
                      <div key={table.id}>
                        <PeopleTableCard
                          tableId={table.id}
                          tableName={table.name}
                          capacity={table.capacity}
                          people={table.people}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPeoplePage;
