import { Language, SUPPORTED_LANGS } from "@/common/language";
import Status from "@/common/status";
import { PresetMenuRepository } from "@/repositories/preset-menu-repo";
import { GetPresetMenuResponse } from "@/types/api/preset-menu/GET";
import {
  PostPresetMenuRequest,
  PostPresetMenuResponse,
} from "@/types/api/preset-menu/POST";
import { mapPresetMenuToResponse } from "@/utils/mappers/mapPresetMenuToResponse";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang } = req.query as { lang?: Language };
  const { Ok, BadRequest, NotAllowed, InternalError } = Status(res);

  switch (method) {
    case "GET":
      try {
        if (!SUPPORTED_LANGS.includes(lang || "en"))
          return BadRequest(
            "lang is required and must be one of " + SUPPORTED_LANGS.join(", ")
          );

        const presetMenus = await PresetMenuRepository.getAllPresetMenus(lang);

        const response: GetPresetMenuResponse = {
          presetMenus: presetMenus.map(mapPresetMenuToResponse),
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
