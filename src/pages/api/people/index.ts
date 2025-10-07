import Status from "@/common/status";
import { getPeople } from "@/repositories/people-repo";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, NotFound } = Status(res);

  switch (method) {
    case "GET":
      const people = await getPeople();

      if (!people || people.length === 0) return NotFound("No people found");

      return Ok(people);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
