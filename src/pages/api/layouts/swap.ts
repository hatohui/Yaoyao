import Status from "@/common/status";
import { swapTablesBetweenSlots } from "@/repositories/layout-repo";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest } = Status(res);

  try {
    switch (method) {
      case "POST":
        const { slot1Id, slot2Id } = req.body;

        if (!slot1Id || !slot2Id) {
          return BadRequest("Both slot1Id and slot2Id are required");
        }

        const slot1 = Number(slot1Id);
        const slot2 = Number(slot2Id);

        if (isNaN(slot1) || isNaN(slot2)) {
          return BadRequest("Invalid slot IDs");
        }

        const result = await swapTablesBetweenSlots(slot1, slot2);

        return Ok(result);
      default:
        return NotAllowed();
    }
  } catch (error) {
    console.error("Error swapping tables:", error);
    return BadRequest("Error swapping tables");
  }
};

export default handler;
