import { Language, SUPPORTED_LANGS } from "@/common/language";
import { Status } from "@/common/status";
import { getFoodById } from "@/repositories/food-repo";
import { GetFoodByIdResponse } from "@/types/api/food/GET";
import { TranslatedFood } from "@/types/models/food";
import { isValidId } from "@/utils/idValidation";
import { mapFoodToResponse } from "@/utils/mapFoodToResponse";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang, id } = req.query as { lang?: Language; id?: string };
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);

  switch (method) {
    case "GET":
      if (!SUPPORTED_LANGS.includes(lang || "en"))
        return BadRequest(
          "lang is required and must be one of " + SUPPORTED_LANGS.join(", ")
        );

      if (!isValidId(id))
        return BadRequest("id is required and must be a valid UUID");

      const food = (await getFoodById(id, lang)) as TranslatedFood;

      if (food === null) return NotFound("No food found");

      const response: GetFoodByIdResponse = mapFoodToResponse(food);

      return Ok(response);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
