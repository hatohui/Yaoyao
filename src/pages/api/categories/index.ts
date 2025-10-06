import Errors from "@/common/errors";
import { Language, SUPPORTED_LANGS } from "@/common/language";
import { getCategories } from "@/services/category-service";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { lang } = req.query as { lang?: Language };
  const { NotAllowed, BadRequest, NotFound } = Errors(res);

  switch (method) {
    case "GET":
      if (!lang || !SUPPORTED_LANGS.includes(lang))
        return BadRequest(
          "lang is required and must be one of " + SUPPORTED_LANGS.join(", ")
        );

      const categories = await getCategories(lang);

      if (!categories) {
        return NotFound("No category found");
      }

      return res.status(200).json(categories);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
