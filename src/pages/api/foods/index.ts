import { Language, SUPPORTED_LANGS } from "@/common/language";
import Status from "@/common/status";
import { MENU_PAGINATION_SIZE } from "@/config/app";
import { getCategoryByName } from "@/repositories/category-repo";
import { getFoods, getFoodsByCategory } from "@/repositories/food-repo";
import { GetFoodsResponse } from "@/types/api/food/GET";
import { mapFoodToResponse } from "@/utils/mappers/mapFoodToResponse";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang, category, page, count, search } = req.query as {
    lang?: Language;
    category?: string;
    page?: string;
    count?: string;
    search?: string;
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

      if (category) {
        const categoryData = await getCategoryByName(category);

        if (categoryData) {
          result = await getFoodsByCategory(
            categoryData.id,
            lang,
            pageNum,
            countNum,
            search
          );
        } else {
          return BadRequest("Invalid category");
        }
      } else {
        result = await getFoods(lang, pageNum, countNum, search);
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
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
