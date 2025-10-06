import Errors from "@/common/errors";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import { getCategoryById } from "@/repositories/category-repo";
import { GetCategoryByIdResponse } from "@/types/api/category/GET";
import { TranslatedCategory } from "@/types/models/category";
import { NextApiHandler } from "next";
import { z } from "zod/mini";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang, id } = req.query as { lang?: Language; id?: string };
  const { NotAllowed, BadRequest, NotFound } = Errors(res);

  switch (method) {
    case "GET":
      if (!SUPPORTED_LANGS.includes(lang || "en"))
        return BadRequest(
          "lang is required and must be one of " + SUPPORTED_LANGS.join(", ")
        );

      const idValidation = z.uuid().safeParse(id);

      if (!id || !idValidation.success)
        return BadRequest("id is required and must be a valid UUID");

      const category = (await getCategoryById(id, lang)) as TranslatedCategory;

      if (!category) {
        return NotFound("No category found");
      }

      const response: GetCategoryByIdResponse = {
        id: category.id,
        description: category.translation?.[0].description
          ? category.translation[0].description
          : category.description,
        name: category.translation?.[0].name
          ? category.translation[0].name
          : category.name,
      };

      return res.status(200).json(response);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
