import Status from "@/common/status";
import { copyProductionToStaging } from "@/repositories/table-repo";
import { PostCopyProductionToStagingResponse } from "@/types/api/staging/POST";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, InternalError } = Status(res);

  switch (method) {
    case "POST":
      try {
        const stagingTables = await copyProductionToStaging();

        const response: PostCopyProductionToStagingResponse = {
          message: "Successfully copied production tables to staging",
          count: stagingTables.length,
          tables: stagingTables,
        };

        return Ok(response);
      } catch (error) {
        console.error("Error copying production to staging:", error);
        return InternalError("Failed to copy production to staging");
      }
    default:
      return NotAllowed();
  }
};

export default handler;
