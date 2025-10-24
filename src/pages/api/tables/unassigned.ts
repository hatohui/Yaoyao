import Status from "@/common/status";
import { getUnassignedTables } from "@/repositories/table-repo";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, NotFound } = Status(res);

  try {
    switch (method) {
      case "GET":
        const unassignedTables = await getUnassignedTables();

        if (!unassignedTables) {
          return Ok([]);
        }

        return Ok(unassignedTables);
      default:
        return NotAllowed();
    }
  } catch (error) {
    console.error("Error fetching unassigned tables:", error);
    return NotFound("Error fetching unassigned tables");
  }
};

export default handler;
