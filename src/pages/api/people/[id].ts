import Status from "@/common/status";
import { getPeopleById } from "@/repositories/people-repo";
import { isValidId } from "@/utils/validation/idValidation";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);
  const { id } = req.query;

  if (!isValidId(id)) return BadRequest("Invalid id");

  switch (method) {
    case "GET":
      const person = await getPeopleById(id);

      if (!person) return NotFound("No person found");

      return Ok(person);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
