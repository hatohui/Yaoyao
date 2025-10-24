import Status from "@/common/status";
import {
  createLayout,
  getLayoutByTableId,
  getLayouts,
  getNewLayoutId,
} from "@/repositories/layout-repo";
import { PostLayoutRequest } from "@/types/api/layout/POST";
import layoutSchema from "@/utils/validation/layout";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);

  try {
    switch (method) {
      case "GET":
        const results = await getLayouts();

        if (!results) {
          return NotFound("No layouts found");
        }

        return Ok(results);
      case "POST":
        const request = req.body as PostLayoutRequest;

        const validation = layoutSchema.parse(request);

        if (!validation) {
          return BadRequest("Invalid layout data");
        }

        // Only check for existing layout if tableId is provided
        if (validation.tableId) {
          const existing = await getLayoutByTableId(validation.tableId);
          if (existing) return BadRequest("Layout for table already exists");
        }

        const id = await getNewLayoutId();

        const newLayout = {
          ...request,
          id,
        };

        const createdLayout = await createLayout(newLayout);

        return Ok(createdLayout);
      default:
        return NotAllowed();
    }
  } catch (error) {
    console.error("Error handling layout request:", error);
    return BadRequest("Error handling layout request");
  }
};

export default handler;
