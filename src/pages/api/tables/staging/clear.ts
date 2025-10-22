import Status from "@/common/status";
import { clearStaging } from "@/repositories/table-repo";
import { DeleteClearStagingResponse } from "@/types/api/staging/DELETE";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, InternalError } = Status(res);

  switch (method) {
    case "DELETE":
      try {
        const result = await clearStaging();

        const response: DeleteClearStagingResponse = {
          message: "Successfully cleared all staging tables",
          count: result.count,
        };

        return Ok(response);
      } catch (error) {
        console.error("Error clearing staging:", error);
        return InternalError("Failed to clear staging tables");
      }
    default:
      return NotAllowed();
  }
};

export default handler;
