import { GetTables, GetTablesWithPeople } from "@/repositories/table-repo";
import { GetTablesWithPaginationResponse } from "@/types/api/table/GET";

export const mapTablesToTablesWithPagination = (
  result: GetTables,
  pageNum: number,
  countNum: number,
  totalPages: number
): GetTablesWithPaginationResponse => {
  return {
    tables: result.tables.map((table) => ({
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      tableLeader: table.tableLeader,
      referenceId: table.referenceId,
      isStaging: table.isStaging,
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
      peopleCount: table._count.people,
      orders: table.orders,
      layout: table.layout,
    })),
    pagination: {
      page: pageNum,
      count: countNum,
      total: result.total,
      totalPages,
    },
  };
};

export const mapTablesWithPeopleAndPaginationToTables = (
  tablesWithPeople: GetTablesWithPeople,
  pageNum: number,
  countNum: number,
  totalPages: number
) => {
  return {
    tables: tablesWithPeople.tables.map((table) => ({
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      tableLeader: table.tableLeader,
      referenceId: table.referenceId,
      isStaging: table.isStaging,
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
      people: table.people,
      layout: table.layout,
    })),
    pagination: {
      page: pageNum,
      count: countNum,
      total: tablesWithPeople.total,
      totalPages,
    },
  };
};
