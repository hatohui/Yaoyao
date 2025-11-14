import Status from "@/common/status";
import { PresetMenuRepository } from "@/repositories/preset-menu-repo";
import { GetPresetMenuResponse } from "@/types/api/preset-menu/GET";
import {
  PostPresetMenuRequest,
  PostPresetMenuResponse,
} from "@/types/api/preset-menu/POST";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { Ok, BadRequest, NotAllowed, InternalError } = Status(res);

  switch (method) {
    case "GET":
      try {
        const presetMenus = await PresetMenuRepository.getAllPresetMenus();

        const response: GetPresetMenuResponse = {
          presetMenus,
        };

        return Ok(response);
      } catch (error) {
        console.error("Error fetching preset menus:", error);
        return InternalError("Failed to fetch preset menus");
      }

    case "POST":
      try {
        const body = req.body as PostPresetMenuRequest;

        if (!body.foodId) {
          return BadRequest("foodId is required");
        }

        const presetMenu = await PresetMenuRepository.createPresetMenu(body);

        const response: PostPresetMenuResponse = {
          message: "Preset menu created successfully",
          presetMenu,
        };

        return Ok(response);
      } catch (error) {
        console.error("Error creating preset menu:", error);
        return InternalError("Failed to create preset menu");
      }

    default:
      return NotAllowed();
  }
};

export default handler;
