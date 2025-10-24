import Status from "@/common/status";
import { getLayouts } from "@/repositories/layout-repo";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, NotFound } = Status(res);

  try {
    switch (method) {
      case "GET":
        const layouts = await getLayouts();

        // Filter only layouts with assigned tables
        const assignedLayouts = layouts.filter(
          (layout) => layout.tableId !== null
        );

        if (!assignedLayouts || assignedLayouts.length === 0) {
          return Ok([]);
        }

        return Ok(assignedLayouts);
      default:
        return NotAllowed();
    }
  } catch (error) {
    console.error("Error fetching assigned layouts:", error);
    return NotFound("Error fetching assigned layouts");
  }
};

export default handler;
