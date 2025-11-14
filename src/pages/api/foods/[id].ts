import { Language, SUPPORTED_LANGS } from "@/common/language";
import { Status } from "@/common/status";
import {
  getFoodById,
  getFoodByIdWithAllTranslations,
  updateFoodAvailability,
  updateFood,
  deleteFood,
} from "@/repositories/food-repo";
import { GetFoodByIdResponse } from "@/types/api/food/GET";
import { PutFoodRequest } from "@/types/api/food/PUT";
import { TranslatedFood } from "@/types/models/food";
import { isValidId } from "@/utils/validation/idValidation";
import { mapFoodToResponse } from "@/utils/mappers/mapFoodToResponse";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang, id, includeAllTranslations } = req.query as {
    lang?: Language;
    id?: string;
    includeAllTranslations?: string;
  };
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);

  switch (method) {
    case "GET":
      if (!isValidId(id))
        return BadRequest("id is required and must be a valid UUID");

      // If includeAllTranslations is requested, return food with all translations
      if (includeAllTranslations === "true") {
        try {
          const food = await getFoodByIdWithAllTranslations(id);

          if (!food) {
            return NotFound("Food not found");
          }

          return Ok(food);
        } catch (error) {
          console.error("Error fetching food with translations:", error);
          return BadRequest("Error fetching food");
        }
      }

      // Otherwise, return localized food (original behavior)
      if (!SUPPORTED_LANGS.includes(lang || "en"))
        return BadRequest(
          "lang is required and must be one of " + SUPPORTED_LANGS.join(", ")
        );

      const food = (await getFoodById(id, lang)) as TranslatedFood;

      if (food === null) return NotFound("No food found");

      const response: GetFoodByIdResponse = mapFoodToResponse(food);

      return Ok(response);
    case "PUT":
      if (!isValidId(id))
        return BadRequest("id is required and must be a valid UUID");

      try {
        const body = req.body as PutFoodRequest;

        // Check if it's just an availability update (legacy behavior)
        if (
          typeof body.available === "boolean" &&
          Object.keys(body).length === 1
        ) {
          const existingFood = await getFoodById(id);
          if (!existingFood) {
            return NotFound("Food not found", "FOOD_NOT_FOUND");
          }

          const updatedFood = await updateFoodAvailability(id, body.available);
          return Ok(updatedFood);
        }

        // Full update
        if (Object.keys(body).length === 0) {
          return BadRequest("No fields to update", "INVALID_INPUT");
        }

        const existingFood = await getFoodById(id);
        if (!existingFood) {
          return NotFound("Food not found", "FOOD_NOT_FOUND");
        }

        const updatedFood = await updateFood(id, body);
        return Ok(updatedFood);
      } catch (error) {
        console.error("Error updating food:", error);
        return Status(res).InternalError(
          "Failed to update food",
          "GENERIC_ERROR"
        );
      }
    case "DELETE":
      if (!isValidId(id))
        return BadRequest("id is required and must be a valid UUID");

      try {
        const existingFood = await getFoodById(id);
        if (!existingFood) {
          return NotFound("Food not found", "FOOD_NOT_FOUND");
        }

        await deleteFood(id);
        return Ok({ success: true, message: "Food deleted successfully" });
      } catch (error) {
        console.error("Error deleting food:", error);
        return Status(res).InternalError(
          "Failed to delete food",
          "GENERIC_ERROR"
        );
      }
    default:
      return NotAllowed();
  }
};

export default handler;
