import Status from "@/common/status";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import {
  createNewTable,
  GetTables,
  getTables,
  GetTablesWithPeople,
  getTablesWithPeople,
} from "@/repositories/table-repo";
import { PostTableRequest } from "@/types/api/table/POST";
import {
  mapTablesToTablesWithPagination,
  mapTablesWithPeopleAndPaginationToTables,
} from "@/utils/mappers/mapTablesToTablesWithPagination";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, Created, InternalError, NotFound } =
    Status(res);

  switch (method) {
    case "GET":
      const { people, page, count, search, isStaging, direction, sortBy } =
        req.query;

      const isStagingMode = isStaging === "true";
      const pageNum = page ? parseInt(page as string, 10) : 1;
      const countNum = count
        ? parseInt(count as string, 10)
        : TABLE_PAGINATION_SIZE;

      if (pageNum < 1 || countNum < 1)
        return BadRequest("page and count must be positive integers");

      let result = null;

      if (people === "true") {
        result = await getTablesWithPeople(
          isStagingMode,
          search as string,
          pageNum,
          countNum,
          direction as "asc" | "desc" | undefined,
          sortBy as "name" | "layout" | undefined
        );
      } else {
        result = await getTables(
          pageNum,
          countNum,
          search as string,
          isStagingMode,
          direction as "asc" | "desc" | undefined,
          sortBy as "name" | "layout" | undefined
        );
      }

      if (!result || result.tables.length === 0) return NotFound();

      const totalPages = Math.ceil(result.total / countNum);

      if (people === "true") {
        return Ok(
          mapTablesWithPeopleAndPaginationToTables(
            result as GetTablesWithPeople,
            pageNum,
            countNum,
            totalPages
          )
        );
      } else {
        return Ok(
          mapTablesToTablesWithPagination(
            result as GetTables,
            pageNum,
            countNum,
            totalPages
          )
        );
      }
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
