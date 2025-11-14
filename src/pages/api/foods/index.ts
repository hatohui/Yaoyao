import { Language, SUPPORTED_LANGS } from "@/common/language";
import Status from "@/common/status";
import { MENU_PAGINATION_SIZE } from "@/config/app";
import { getCategoryByName } from "@/repositories/category-repo";
import {
  getFoods,
  getFoodsByCategory,
  createFood,
} from "@/repositories/food-repo";
import { GetFoodsResponse } from "@/types/api/food/GET";
import { PostFoodRequest } from "@/types/api/food/POST";
import { mapFoodToResponse } from "@/utils/mappers/mapFoodToResponse";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang, category, page, count, search, available } = req.query as {
    lang?: Language;
    category?: string;
    page?: string;
    count?: string;
    search?: string;
    available?: string;
  };
  const { NotAllowed, Ok, BadRequest } = Status(res);

  switch (method) {
    case "GET":
      if (!SUPPORTED_LANGS.includes(lang || "en"))
        return BadRequest(
          "lang is required and must be one of " + SUPPORTED_LANGS.join(", ")
        );

      const pageNum = page ? parseInt(page, 10) : 1;
      const countNum = count ? parseInt(count, 10) : MENU_PAGINATION_SIZE;

      if (pageNum < 1 || countNum < 1) {
        return BadRequest("page and count must be positive integers");
      }

      let result;
      const availableFilter =
        available === "true" ? true : available === "false" ? false : undefined;

      if (category) {
        const categoryData = await getCategoryByName(category);

        if (categoryData) {
          result = await getFoodsByCategory(
            categoryData.id,
            lang,
            pageNum,
            countNum,
            search,
            availableFilter
          );
        } else {
          return BadRequest("Invalid category");
        }
      } else {
        result = await getFoods(
          lang,
          pageNum,
          countNum,
          search,
          availableFilter
        );
      }

      if (!result || result.foods.length === 0) {
        return Ok({
          foods: [],
          pagination: {
            page: pageNum,
            count: countNum,
            total: 0,
            totalPages: 0,
          },
        });
      }

      const totalPages = Math.ceil(result.total / countNum);

      const response: GetFoodsResponse = {
        foods: result.foods.map(mapFoodToResponse),
        pagination: {
          page: pageNum,
          count: countNum,
          total: result.total,
          totalPages,
        },
      };

      return Ok(response);
    case "POST":
      try {
        const body = req.body as PostFoodRequest;

        if (!body.name || !body.categoryId) {
          return BadRequest(
            "name and categoryId are required",
            "INVALID_INPUT"
          );
        }

        const newFood = await createFood(body);

        return Ok(newFood);
      } catch (error) {
        console.error("Error creating food:", error);
        return Status(res).InternalError(
          "Failed to create food",
          "GENERIC_ERROR"
        );
      }
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
