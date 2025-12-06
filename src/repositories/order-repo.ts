import { prisma } from "@/common/prisma";
import { Order } from "@prisma/client";

export type OrderWithDetails = Order & {
  food: {
    id: string;
    name: string;
    imageUrl: string | null;
    available: boolean;
    isHidden?: boolean | null;
    translations?: {
      name: string;
      description: string | null;
    }[];
    variants: {
      id: string;
      label: string;
      price: number | null;
      currency: string | null;
      available: boolean;
    }[];
  };
  variant?: {
    id: string;
    label: string;
    price: number | null;
    currency: string | null;
    available: boolean;
  } | null;
  taggedPerson?: {
    id: string;
    name: string;
  } | null;
};

/**
 * Get all orders for a specific table
 */
export const getOrdersByTableId = async (
  tableId: string,
  lang: string = "en"
): Promise<OrderWithDetails[]> => {
  return await prisma.order.findMany({
    where: { tableId },
    include: {
      food: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          available: true,
          isHidden: true,
          translations: {
            where: {
              language: lang,
            },
            select: {
              name: true,
              description: true,
            },
          },
          variants: {
            select: {
              id: true,
              label: true,
              price: true,
              currency: true,
              available: true,
            },
          },
        },
      },
      variant: {
        select: {
          id: true,
          label: true,
          price: true,
          currency: true,
          available: true,
        },
      },
      taggedPerson: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Get a specific order by ID
 */
export const getOrderById = async (
  orderId: string
): Promise<OrderWithDetails | null> => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      food: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          available: true,
          isHidden: true,
          variants: {
            select: {
              id: true,
              label: true,
              price: true,
              currency: true,
              available: true,
            },
          },
        },
      },
      variant: {
        select: {
          id: true,
          label: true,
          price: true,
          currency: true,
          available: true,
        },
      },
      taggedPerson: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

/**
 * Create a new order
 */
export const createOrder = async (data: {
  tableId: string;
  foodId: string;
  variantId?: string;
  quantity: number;
}): Promise<Order> => {
  return await prisma.order.create({
    data: {
      tableId: data.tableId,
      foodId: data.foodId,
      variantId: data.variantId,
      quantity: data.quantity,
    },
  });
};

/**
 * Update order
 */
export const updateOrder = async (
  orderId: string,
  data: {
    quantity?: number;
    taggedPersonId?: string | null;
  }
): Promise<Order> => {
  return await prisma.order.update({
    where: { id: orderId },
    data,
  });
};

/**
 * Update order quantity (legacy - kept for compatibility)
 */
export const updateOrderQuantity = async (
  orderId: string,
  quantity: number
): Promise<Order> => {
  return updateOrder(orderId, { quantity });
};

/**
 * Delete an order
 */
export const deleteOrder = async (orderId: string): Promise<Order> => {
  return await prisma.order.delete({
    where: { id: orderId },
  });
};

/**
 * Delete all orders for a table
 */
export const deleteOrdersByTableId = async (
  tableId: string
): Promise<{ count: number }> => {
  return await prisma.order.deleteMany({
    where: { tableId },
  });
};

/**
 * Check if an order exists and belongs to a table
 */
export const verifyOrderOwnership = async (
  orderId: string,
  tableId: string
): Promise<boolean> => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      tableId: tableId,
    },
  });
  return !!order;
};
