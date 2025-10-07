import Errors from "@/common/status";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import { getCategories } from "@/repositories/category-repo";
import { GetCategoriesResponse } from "@/types/api/category/GET";
import { TranslatedCategory } from "@/types/models/category";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang } = req.query as { lang?: Language };
  const { NotAllowed, BadRequest, NotFound } = Errors(res);

  switch (method) {
    case "GET":
      if (!SUPPORTED_LANGS.includes(lang || "en"))
        return BadRequest(
          "lang is required and must be one of " + SUPPORTED_LANGS.join(", ")
        );

      const categories = await getCategories(lang);

      if (!categories) {
        return NotFound("No category found");
      }

      const response: GetCategoriesResponse = categories.map(
        (category: TranslatedCategory) => ({
          id: category.id,
          description: category.translation?.[0].description
            ? category.translation[0].description
            : category.description,
          name: category.translation?.[0].name
            ? category.translation[0].name
            : category.name,
        })
      );

      return res.status(200).json(response);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
