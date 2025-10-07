import { Language, SUPPORTED_LANGS } from "@/common/language";
import Status from "@/common/status";
import { getCategoryByName } from "@/repositories/category-repo";
import { getFoods, getFoodsByCategory } from "@/repositories/food-repo";
import { GetFoodsResponse } from "@/types/api/food/GET";
import { mapFoodToResponse } from "@/utils/mapFoodToResponse";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang, category } = req.query as {
    lang?: Language;
    category?: string;
  };
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);

  switch (method) {
    case "GET":
      if (!SUPPORTED_LANGS.includes(lang || "en"))
        return BadRequest(
          "lang is required and must be one of " + SUPPORTED_LANGS.join(", ")
        );

      let foods;

      if (category) {
        const categoryData = await getCategoryByName(category);

        if (categoryData) {
          foods = await getFoodsByCategory(categoryData.id, lang);
        } else {
          return BadRequest("Invalid category");
        }
      } else foods = await getFoods(lang);

      if (foods === null) return NotFound("No food found");

      const response: GetFoodsResponse = foods.map(mapFoodToResponse);

      return Ok(response);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
