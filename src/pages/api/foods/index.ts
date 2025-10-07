import { Language, SUPPORTED_LANGS } from "@/common/language";
import Status from "@/common/status";
import { getCategoryByName } from "@/repositories/category-repo";
import {
  createFood,
  getFoods,
  getFoodsByCategory,
} from "@/repositories/food-repo";
import { GetFoodsResponse } from "@/types/api/food/GET";
import { TranslatedFood } from "@/types/models/food";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang, category } = req.query as {
    lang?: Language;
    category?: string;
  };
  const { NotAllowed, Ok, Created, InternalError, BadRequest, NotFound } =
    Status(res);

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

      const response: GetFoodsResponse = foods.map((food: TranslatedFood) => ({
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
      }));

      return Ok(response);
    case "POST":
      const data = req.body;
      const newFood = await createFood(data);
      if (!newFood) return InternalError("Failed to create food");

      return Created(newFood);
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
