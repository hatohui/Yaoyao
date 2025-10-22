import Status from "@/common/status";
import { commitStagingToProduction } from "@/repositories/table-repo";
import { PostCommitStagingResponse } from "@/types/api/staging/POST";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, InternalError } = Status(res);

  switch (method) {
    case "POST":
      try {
        const productionTables = await commitStagingToProduction();

        const response: PostCommitStagingResponse = {
          message: "Successfully committed staging to production",
          count: productionTables.length,
          tables: productionTables,
        };

        return Ok(response);
      } catch (error) {
        console.error("Error committing staging to production:", error);
        // Log the full error details for debugging
        if (error instanceof Error) {
          console.error("Error name:", error.name);
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
        return InternalError("Failed to commit staging to production");
      }
    default:
      return NotAllowed();
  }
};

export default handler;
