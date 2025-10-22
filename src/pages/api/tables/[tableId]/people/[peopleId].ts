import Status from "@/common/status";
import { updatePeopleName } from "@/repositories/people-repo";
import {
  getPeopleInTableById,
  removePeopleFromTable,
} from "@/repositories/table-repo";
import { isValidId } from "@/utils/validation/idValidation";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { Ok, BadRequest, NotFound, InternalError, NotAllowed } = Status(res);
  const { tableId, peopleId } = req.query;

  if (!isValidId(tableId)) return BadRequest("Invalid tableId");
  if (!isValidId(peopleId)) return BadRequest("Invalid peopleId");

  switch (method) {
    case "GET":
      const people = await getPeopleInTableById(tableId, peopleId);
      if (!people) return NotFound("This person is not in this table");

      return Ok(people);
    case "POST":
    case "PUT":
      const { name } = req.body;

      if (!name) return BadRequest("Missing name");

      const toUpdate = await getPeopleInTableById(tableId, peopleId);
      if (!toUpdate) return NotFound("This person is not in this table");

      const updated = await updatePeopleName(peopleId, name);
      if (!updated) return InternalError("Failed to update this person");

      return Ok(updated);
    case "DELETE":
      const toRemove = await getPeopleInTableById(tableId, peopleId);
      if (!toRemove) return BadRequest("This person is not in this table");
      const removed = await removePeopleFromTable(peopleId);
      if (!removed) return InternalError("Failed to remove this person");

      return Ok(removed);
    default:
      return NotAllowed();
  }
};

export default handler;
