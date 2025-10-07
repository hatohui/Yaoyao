import Errors from "@/common/status";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import { getCategoryById } from "@/repositories/category-repo";
import { GetCategoryByIdResponse } from "@/types/api/category/GET";
import { NextApiHandler } from "next";
import { z } from "zod/mini";
import mapCategoryToResponse from "@/utils/mapCategoryToResponse";

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

      const category = await getCategoryById(id, lang);

      if (!category) {
        return NotFound("No category found");
      }

      const response: GetCategoryByIdResponse = mapCategoryToResponse(category);

      return res.status(200).json(response);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
