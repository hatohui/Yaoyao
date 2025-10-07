import Status from "@/common/status";
import { addNewPeople } from "@/repositories/people-repo";
import {
  assignTableLeader,
  getTableLeaderByTableId,
} from "@/repositories/table-repo";
import { PostPeopleRequest } from "@/types/api/people/POST";
import { isValidId } from "@/utils/idValidation";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);
  const { tableId } = req.query;

  if (!isValidId(tableId)) return BadRequest("Invalid tableId");

  switch (method) {
    case "GET":
      const leader = await getTableLeaderByTableId(tableId);

      if (!leader) return NotFound("No leader found for this table");

      return Ok(leader);
    case "POST":
      const { name } = req.body as PostPeopleRequest;

      if (!name) return BadRequest("Missing name");

      const { id: newPersonId } = await addNewPeople(name, tableId);
      if (!newPersonId) return BadRequest("Failed to add this person!");

      const newLeader = await assignTableLeader(tableId, newPersonId);

      if (!newLeader) return BadRequest("Failed to assign leader");

      return Ok(newLeader);
    case "PUT":
      const { id } = req.body as { id?: string };

      if (!isValidId(id))
        return BadRequest("peopleId is required and must be a valid UUID");

      const updatedLeader = await assignTableLeader(tableId, id);

      if (!updatedLeader) return BadRequest("Failed to assign leader");

      return Ok(updatedLeader);
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
