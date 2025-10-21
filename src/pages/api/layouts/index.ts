import Status from "@/common/status";
import {
  createLayout,
  getLayoutByTableId,
  getLayouts,
  getNewLayoutId,
} from "@/repositories/layout-repo";
import { PostLayoutRequest } from "@/types/api/layout/POST";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);

  switch (method) {
    case "GET":
      const results = await getLayouts();

      if (!results) {
        return NotFound("No layouts found");
      }

      return Ok(results);
    case "POST":
      const request = req.body as PostLayoutRequest;

      if (!request || !request.tableId) {
        return BadRequest("Invalid body");
      }

      const existing = await getLayoutByTableId(request.tableId);

      if (existing) return BadRequest("Layout for table already exists");

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
};

export default handler;
