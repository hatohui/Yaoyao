import { Language, SUPPORTED_LANGS } from "@/common/language";
import { Status } from "@/common/status";
import { getFoodById } from "@/repositories/food-repo";
import { GetFoodByIdResponse } from "@/types/api/food/GET";
import { TranslatedFood } from "@/types/models/food";
import { NextApiHandler } from "next";
import z from "zod/v4";

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

      const idValidation = z.uuid().safeParse(id);

      if (!id || !idValidation.success)
        return BadRequest("id is required and must be a valid UUID");

      const food = (await getFoodById(id, lang)) as TranslatedFood;

      if (food === null) return NotFound("No food found");

      const response: GetFoodByIdResponse = {
        id: food.id,
        name: food.translations?.[0].name
          ? food.translations[0].name
          : food.name,
        description: food.translations?.[0].description
          ? food.translations[0].description
          : food.description,
        available: food.available,
        imageUrl: food.imageUrl,
        categoryId: food.categoryId,
        createdAt: food.createdAt,
        updatedAt: food.updatedAt,
        variants: food.variants,
      };

      return Ok(response);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
