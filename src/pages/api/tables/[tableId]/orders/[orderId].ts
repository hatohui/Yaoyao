import Status from "@/common/status";
import {
  getOrderById,
  updateOrderQuantity,
  deleteOrder,
  verifyOrderOwnership,
} from "@/repositories/order-repo";
import { isValidId } from "@/utils/validation/idValidation";
import { PatchOrderRequest } from "@/types/api/order/PATCH";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound } = Status(res);
  const { tableId, orderId } = req.query;

  if (!isValidId(tableId)) {
    return BadRequest("Invalid table ID", "INVALID_INPUT");
  }

  if (!isValidId(orderId)) {
    return BadRequest("Invalid order ID", "INVALID_INPUT");
  }

  // Verify order exists and belongs to the table
  const orderBelongsToTable = await verifyOrderOwnership(
    orderId as string,
    tableId as string
  );

  if (!orderBelongsToTable) {
    return NotFound("Order not found", "ORDER_NOT_FOUND");
  }

  switch (method) {
    case "GET":
      try {
        const order = await getOrderById(orderId as string);
        if (!order) {
          return NotFound("Order not found", "ORDER_NOT_FOUND");
        }
        return Ok(order);
      } catch (error) {
        console.error("Error fetching order:", error);
        return Status(res).InternalError(
          "Failed to fetch order",
          "GENERIC_ERROR"
        );
      }

    case "PUT":
      try {
        const body = req.body as PatchOrderRequest;

        // Validate request body
        if (!body.quantity || body.quantity <= 0) {
          return BadRequest(
            "Quantity must be a positive number",
            "INVALID_QUANTITY"
          );
        }

        const updatedOrder = await updateOrderQuantity(
          orderId as string,
          body.quantity
        );

        return Ok(updatedOrder);
      } catch (error) {
        console.error("Error updating order:", error);
        return Status(res).InternalError(
          "Failed to update order",
          "GENERIC_ERROR"
        );
      }

    case "DELETE":
      try {
        await deleteOrder(orderId as string);
        return Ok({ success: true });
      } catch (error) {
        console.error("Error deleting order:", error);
        return Status(res).InternalError(
          "Failed to delete order",
          "GENERIC_ERROR"
        );
      }

    case "POST":
    case "PUT":
    default:
      return NotAllowed();
  }
};

export default handler;
