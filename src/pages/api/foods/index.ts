import Status from "@/common/status";
import { createFood, getFoods } from "@/repositories/food-repo";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, Created, InternalError } = Status(res);

  switch (method) {
    case "GET":
      const foods = await getFoods();
      if (foods === null) return InternalError("Failed to fetch foods");
      return Ok(foods);
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
