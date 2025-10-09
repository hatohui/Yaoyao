import Status from "@/common/status";
import {
  getTableById,
  updateTablePaymentStatus,
} from "@/repositories/table-repo";
import { isValidId } from "@/utils/idValidation";
import { NextApiHandler } from "next";

type PatchPaymentRequest = {
  paid: boolean;
};

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);
  const { tableId } = req.query;

  if (!isValidId(tableId)) {
    return BadRequest("Invalid table ID", "INVALID_INPUT");
  }

  // Verify table exists
  const table = await getTableById(tableId as string);
  if (!table) {
    return NotFound("Table not found", "TABLE_NOT_FOUND");
  }

  switch (method) {
    case "PUT":
      try {
        const body = req.body as PatchPaymentRequest;

        if (typeof body.paid !== "boolean") {
          return BadRequest("Invalid paid status", "INVALID_INPUT");
        }

        const updatedTable = await updateTablePaymentStatus(
          tableId as string,
          body.paid
        );

        return Ok(updatedTable);
      } catch (error) {
        console.error("Error updating payment status:", error);
        return Status(res).InternalError(
          "Failed to update payment status",
          "GENERIC_ERROR"
        );
      }

    case "GET":
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
