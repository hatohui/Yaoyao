import Status from "@/common/status";
import { getTableById } from "@/repositories/table-repo";
import { createOrder, getOrdersByTableId } from "@/repositories/order-repo";
import { getFoodWithVariantsForOrder } from "@/repositories/food-repo";
import { isValidId } from "@/utils/idValidation";
import { PostOrderRequest } from "@/types/api/order/POST";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok, BadRequest, NotFound, Created } = Status(res);
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
    case "GET":
      try {
        const lang = (req.query.lang as string) || "en";
        const orders = await getOrdersByTableId(tableId as string, lang);
        return Ok(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        return Status(res).InternalError(
          "Failed to fetch orders",
          "GENERIC_ERROR"
        );
      }

    case "POST":
      try {
        const body = req.body as PostOrderRequest;

        // Validate request body
        if (!body.foodId || !body.quantity || body.quantity <= 0) {
          return BadRequest("Invalid request body", "INVALID_INPUT");
        }

        if (!isValidId(body.foodId)) {
          return BadRequest("Invalid food ID", "INVALID_INPUT");
        }

        if (body.variantId && !isValidId(body.variantId)) {
          return BadRequest("Invalid variant ID", "INVALID_INPUT");
        }

        // Verify food exists and is available
        const food = await getFoodWithVariantsForOrder(body.foodId);
        if (!food) {
          return NotFound("Food not found", "FOOD_NOT_FOUND");
        }

        if (!food.available) {
          return BadRequest("Food is not available", "FOOD_NOT_AVAILABLE");
        }

        // If variant is specified, verify it exists and is available
        if (body.variantId) {
          const variant = food.variants.find((v) => v.id === body.variantId);
          if (!variant) {
            return NotFound("Variant not found", "VARIANT_NOT_FOUND");
          }
          if (!variant.available) {
            return BadRequest(
              "Variant is not available",
              "VARIANT_NOT_AVAILABLE"
            );
          }
        }

        // Create order
        const order = await createOrder({
          tableId: tableId as string,
          foodId: body.foodId,
          variantId: body.variantId,
          quantity: body.quantity,
        });

        return Created(order);
      } catch (error) {
        console.error("Error creating order:", error);
        return Status(res).InternalError(
          "Failed to create order",
          "GENERIC_ERROR"
        );
      }

    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
