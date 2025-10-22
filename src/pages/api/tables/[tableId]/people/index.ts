import Status from "@/common/status";
import { addPeopleToTable, getPeopleInTable } from "@/repositories/table-repo";
import { PostPeopleRequest } from "@/types/api/people/POST";
import { isValidId } from "@/utils/validation/idValidation";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound, Created } = Status(res);
  const { tableId } = req.query;

  if (!isValidId(tableId)) return BadRequest("Invalid tableId");

  switch (method) {
    case "GET":
      const people = await getPeopleInTable(tableId);

      if (!people) return NotFound("No people found in the table");

      return Ok(people);
    case "POST":
      const body = req.body as PostPeopleRequest;
      const name = body.name.trim();

      if (!name) {
        return BadRequest("Name is required");
      }

      const newPerson = await addPeopleToTable(tableId, name);

      if (!newPerson) {
        return NotFound("Table not found");
      }

      return Created(newPerson);
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
