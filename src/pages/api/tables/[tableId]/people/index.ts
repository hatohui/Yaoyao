import Status from "@/common/status";
import { getPeopleInTable } from "@/repositories/table-repo";
import { isValidId } from "@/utils/idValidation";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);
  const { tableId } = req.query;

  if (!isValidId(tableId)) return BadRequest("Invalid tableId");

  switch (method) {
    case "GET":
      const people = await getPeopleInTable(tableId);

      if (!people) return NotFound("No people found in the table");

      return Ok(people);
    case "POST":

    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
