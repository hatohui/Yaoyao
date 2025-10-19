import Status from "@/common/status";
import { createNewTable, getTables } from "@/repositories/table-repo";
import { PostTableRequest } from "@/types/api/table/POST";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, NotFound, BadRequest, Created, InternalError } =
    Status(res);

  switch (method) {
    case "GET":
      const tables = await getTables();

      if (!tables || tables.length === 0) return NotFound();

      const response = tables.map((table) => ({
        ...table,
        numberOfPeople: table._count.people,
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
