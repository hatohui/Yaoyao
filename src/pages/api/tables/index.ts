import Status from "@/common/status";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import {
  createNewTable,
  getTables,
  getTablesWithPeople,
} from "@/repositories/table-repo";
import { GetTablesWithPaginationResponse } from "@/types/api/table/GET";
import { PostTableRequest } from "@/types/api/table/POST";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, Created, InternalError } = Status(res);

  switch (method) {
    case "GET":
      const { people, page, count, search, isStaging } = req.query;

      // If people=true, return tables with people included (with pagination)
      if (people === "true") {
        const isStagingMode = isStaging === "true";
        const pageNum = page ? parseInt(page as string, 10) : 1;
        const countNum = count
          ? parseInt(count as string, 10)
          : TABLE_PAGINATION_SIZE;

        if (pageNum < 1 || countNum < 1) {
          return BadRequest("page and count must be positive integers");
        }

        const tablesWithPeople = await getTablesWithPeople(
          isStagingMode,
          search as string,
          pageNum,
          countNum
        );

        if (!tablesWithPeople || tablesWithPeople.tables.length === 0) {
          const emptyResponse = {
            tables: [],
            pagination: {
              page: pageNum,
              count: countNum,
              total: 0,
              totalPages: 0,
            },
          };
          return Ok(emptyResponse);
        }

        const totalPages = Math.ceil(tablesWithPeople.total / countNum);

        const response = {
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
          })),
          pagination: {
            page: pageNum,
            count: countNum,
            total: tablesWithPeople.total,
            totalPages,
          },
        };

        return Ok(response);
      }

      // Default: return tables with pagination support
      const pageNum = page ? parseInt(page as string, 10) : 1;
      const countNum = count
        ? parseInt(count as string, 10)
        : TABLE_PAGINATION_SIZE;
      const isStagingMode = isStaging === "true";

      if (pageNum < 1 || countNum < 1) {
        return BadRequest("page and count must be positive integers");
      }

      const result = await getTables(
        pageNum,
        countNum,
        search as string,
        isStagingMode
      );

      if (!result || result.tables.length === 0) {
        const emptyResponse: GetTablesWithPaginationResponse = {
          tables: [],
          pagination: {
            page: pageNum,
            count: countNum,
            total: 0,
            totalPages: 0,
          },
        };
        return Ok(emptyResponse);
      }

      const totalPages = Math.ceil(result.total / countNum);

      const paginatedResponse: GetTablesWithPaginationResponse = {
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
        })),
        pagination: {
          page: pageNum,
          count: countNum,
          total: result.total,
          totalPages,
        },
      };

      return Ok(paginatedResponse);
    case "POST":
      const newTable = req.body as PostTableRequest;
      if (!newTable) return BadRequest("No data provided");

      const createdTable = await createNewTable(newTable);
      if (!createdTable) return InternalError("Failed to create table");

      return Created(createdTable);
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
