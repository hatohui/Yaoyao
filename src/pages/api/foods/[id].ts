import { Language, SUPPORTED_LANGS } from "@/common/language";
import { Status } from "@/common/status";
import { getFoodById, updateFoodAvailability } from "@/repositories/food-repo";
import { GetFoodByIdResponse } from "@/types/api/food/GET";
import { TranslatedFood } from "@/types/models/food";
import { isValidId } from "@/utils/idValidation";
import { mapFoodToResponse } from "@/utils/mappers/mapFoodToResponse";
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
    case "PUT":
      if (!isValidId(id))
        return BadRequest("id is required and must be a valid UUID");

      try {
        const body = req.body as { available?: boolean };

        if (typeof body.available !== "boolean") {
          return BadRequest(
            "available field is required and must be a boolean",
            "INVALID_INPUT"
          );
        }

        const existingFood = await getFoodById(id);
        if (!existingFood) {
          return NotFound("Food not found", "FOOD_NOT_FOUND");
        }

        const updatedFood = await updateFoodAvailability(id, body.available);

        return Ok(updatedFood);
      } catch (error) {
        console.error("Error updating food availability:", error);
        return Status(res).InternalError(
          "Failed to update food availability",
          "GENERIC_ERROR"
        );
      }
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
