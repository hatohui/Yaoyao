import { NextApiHandler } from "next";
import Status from "@/common/status";
import { getMostOrderedFoods } from "@/repositories/food-repo";

const handler: NextApiHandler = async (req, res) => {
  const { Ok, BadRequest } = Status(res);

  if (req.method !== "GET") return Status(res).NotAllowed();

  const { limit } = req.query as { limit?: string };

  let limitNum = 1;
  if (limit !== undefined) {
    limitNum = parseInt(limit, 10);
    if (Number.isNaN(limitNum) || limitNum < 1) {
      return BadRequest("limit must be a positive integer");
    }
  }

  try {
    const results = await getMostOrderedFoods(limitNum);
    return Ok(results);
  } catch (err) {
    console.error("Error getting most ordered foods:", err);
    return Status(res).InternalError("Failed to get most ordered foods");
  }
};

export default handler;
