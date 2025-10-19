import Status from "@/common/status";
import {
  deleteLayout,
  getLayoutById,
  updateLayout,
} from "@/repositories/layout-repo";
import { PutLayoutRequest } from "@/types/api/layout/PUT";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NoContent, InternalError } = Status(res);
  const { id: queryid } = req.query;

  if (!queryid || Array.isArray(queryid) || !Number(queryid)) {
    return BadRequest("Invalid id");
  }

  const layoutId = Number(queryid);

  switch (method) {
    case "GET":
      const layout = await getLayoutById(layoutId);

      if (!layout) {
        return BadRequest("Layout not found");
      }

      return Ok(layout);
    case "PUT":
      const putBody = req.body as PutLayoutRequest;

      if (!putBody) {
        return BadRequest("Invalid body");
      }

      const toUpdateLayout = await getLayoutById(layoutId);

      if (!toUpdateLayout) {
        return BadRequest("No layout exists with this id");
      }

      const updatedLayout = await updateLayout(layoutId, putBody);

      return Ok({ layout: updatedLayout });
    case "DELETE":
      const layoutToDelete = await getLayoutById(layoutId);

      if (!layoutToDelete) {
        return BadRequest("Layout not found");
      }

      const deletedLayout = await deleteLayout(layoutId);

      if (!deletedLayout) {
        return InternalError("Failed to delete layout");
      }

      return NoContent();

    default:
      return NotAllowed();
  }
};

export default handler;
