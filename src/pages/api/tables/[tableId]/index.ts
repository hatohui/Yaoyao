import Status from "@/common/status";
import {
  getTableById,
  putTableById,
  removeTable,
} from "@/repositories/table-repo";
import { PutTableRequest } from "@/types/api/table/PUT";
import { isValidId } from "@/utils/validation/idValidation";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { tableId } = req.query;
  const { NotAllowed, Ok, BadRequest, NoContent, NotFound, InternalError } =
    Status(res);

  if (!isValidId(tableId))
    return BadRequest("tableId is required and must be a valid UUID");

  switch (method) {
    case "GET":
      const table = await getTableById(tableId);

      if (!table) return NotFound("No table found");

      return Ok(table);
    case "PUT":
      const tableToUpdate = await getTableById(tableId);
      if (!tableToUpdate) return NotFound("No table found");

      const data = req.body as PutTableRequest;
      if (!data) return BadRequest("No data provided");

      const result = await putTableById(tableId, data);

      return Ok(result);
    case "DELETE":
      const success = await removeTable(tableId);

      if (!success) return InternalError("Failed to delete table");

      return NoContent();
    default:
      return NotAllowed();
  }
};

export default handler;
