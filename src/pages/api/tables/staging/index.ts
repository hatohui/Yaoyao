import Status from "@/common/status";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import { getStagingTables } from "@/repositories/table-repo";
import { GetStagingTablesWithPaginationResponse } from "@/types/api/staging/GET";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest } = Status(res);

  switch (method) {
    case "GET":
      const { page, count, search } = req.query;

      const pageNum = page ? parseInt(page as string, 10) : 1;
      const countNum = count
        ? parseInt(count as string, 10)
        : TABLE_PAGINATION_SIZE;

      if (pageNum < 1 || countNum < 1) {
        return BadRequest("page and count must be positive integers");
      }

      const result = await getStagingTables(
        pageNum,
        countNum,
        search as string
      );

      const totalPages = Math.ceil(result.total / countNum);

      const response: GetStagingTablesWithPaginationResponse = {
        tables: result.tables.map((table) => ({
          id: table.id,
          name: table.name,
          capacity: table.capacity,
          isStaging: table.isStaging,
          tableLeader: table.tableLeader,
          referenceId: table.referenceId,
          createdAt: table.createdAt,
          updatedAt: table.updatedAt,
          peopleCount: table._count.people,
          people: table.people, // Include people array
          orders: table.orders,
          reference: table.reference,
        })),
        pagination: {
          page: pageNum,
          count: countNum,
          total: result.total,
          totalPages,
        },
      };

      return Ok(response);
    default:
      return NotAllowed();
  }
};

export default handler;
