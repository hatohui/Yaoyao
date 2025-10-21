import Status from "@/common/status";
import {
  createNewTable,
  getTables,
  getTablesWithPeople,
} from "@/repositories/table-repo";
import {
  GetTablesResponse,
  GetTablesWithPeopleResponse,
} from "@/types/api/table/GET";
import { PostTableRequest } from "@/types/api/table/POST";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, NotFound, BadRequest, Created, InternalError } =
    Status(res);

  switch (method) {
    case "GET":
      const { people } = req.query;

      // If people=true, return tables with people included
      if (people === "true") {
        const tablesWithPeople = await getTablesWithPeople();

        if (!tablesWithPeople || tablesWithPeople.length === 0)
          return NotFound();

        const response: GetTablesWithPeopleResponse[] = tablesWithPeople.map(
          (table) => ({
            id: table.id,
            name: table.name,
            capacity: table.capacity,
            tableLeader: table.tableLeader,
            referenceId: table.referenceId,
            createdAt: table.createdAt,
            updatedAt: table.updatedAt,
            people: table.people,
          })
        );

        return Ok(response);
      }

      // Default: return tables without people array
      const tables = await getTables();

      if (!tables || tables.length === 0) return NotFound();

      const response: GetTablesResponse[] = tables.map((table) => ({
        id: table.id,
        name: table.name,
        capacity: table.capacity,
        tableLeader: table.tableLeader,
        referenceId: table.referenceId,
        createdAt: table.createdAt,
        updatedAt: table.updatedAt,
        peopleCount: table._count.people,
        orders: table.orders,
      }));

      return Ok(response);
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
