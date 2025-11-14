import Status from "@/common/status";
import { PresetMenuRepository } from "@/repositories/preset-menu-repo";
import { DeletePresetMenuResponse } from "@/types/api/preset-menu/DELETE";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { id } = req.query as { id: string };
  const { Ok, BadRequest, NotAllowed, NotFound, InternalError } = Status(res);

  switch (method) {
    case "DELETE":
      try {
        if (!id) {
          return BadRequest("id is required");
        }

        const presetMenu = await PresetMenuRepository.getPresetMenuById(id);
        if (!presetMenu) {
          return NotFound("Preset menu not found");
        }

        await PresetMenuRepository.deletePresetMenu(id);

        const response: DeletePresetMenuResponse = {
          message: "Preset menu deleted successfully",
        };

        return Ok(response);
      } catch (error) {
        console.error("Error deleting preset menu:", error);
        return InternalError("Failed to delete preset menu");
      }

    default:
      return NotAllowed();
  }
};

export default handler;
