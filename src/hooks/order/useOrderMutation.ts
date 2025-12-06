"use client";
import axios from "@/common/axios";
import useMutationWithError from "@/hooks/common/useMutationWithError";
import { PostOrderRequest } from "@/types/api/order/POST";
import { PatchOrderRequest } from "@/types/api/order/PATCH";
import { useQueryClient } from "@tanstack/react-query";
import {
  GetOrdersWithPresetsResponse,
  GetOrdersResponse,
} from "@/types/api/order/GET";
import { useSearchParams } from "next/navigation";

export const useAddOrder = (tableId: string) => {
  const queryClient = useQueryClient();
  const locale = useSearchParams()?.get("lang") || "en";

  return useMutationWithError<
    GetOrdersResponse,
    Error,
    PostOrderRequest,
    { previousOrders?: GetOrdersWithPresetsResponse }
  >({
    mutationFn: (data: PostOrderRequest) =>
      axios.post(`/tables/${tableId}/orders`, data),
    successMessageKey: "orderAdded",
    onMutate: async (newOrder) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({
        queryKey: ["orders", tableId, locale],
      });

      // Snapshot the previous value
      const previousOrders =
        queryClient.getQueryData<GetOrdersWithPresetsResponse>([
          "orders",
          tableId,
          locale,
        ]);

      // Optimistically update to the new value
      if (previousOrders) {
        // Get food data from the foods query cache to populate the optimistic order
        const foodsQueries = queryClient.getQueriesData<{
          foods: Array<{
            id: string;
            name: string;
            imageUrl: string | null;
            available: boolean;
            isHidden: boolean;
            translations: {
              name: string;
              description: string | null;
            }[];
            variants: Array<{
              id: string;
              label: string;
              price: number | null;
              currency: string | null;
              available: boolean;
              isSeasonal: boolean;
            }>;
          }>;
        }>({
          queryKey: ["foods"],
        });
        let foodData = null;

        // Search through all foods cache entries to find the food
        for (const [, data] of foodsQueries) {
          if (data?.foods) {
            foodData = data.foods.find((f) => f.id === newOrder.foodId);
            if (foodData) break;
          }
        }

        if (foodData) {
          const optimisticOrder: GetOrdersResponse = {
            id: `temp-${Date.now()}`, // Temporary ID
            tableId,
            foodId: newOrder.foodId,
            variantId: newOrder.variantId || null,
            quantity: newOrder.quantity,
            taggedPersonId: null,
            taggedPerson: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            food: {
              id: foodData.id,
              name: foodData.name,
              imageUrl: foodData.imageUrl,
              available: foodData.available,
              isHidden: foodData.isHidden,
              translations: foodData.translations || [],
              variants: foodData.variants || [],
            },
            variant: newOrder.variantId
              ? foodData.variants?.find((v) => v.id === newOrder.variantId) ||
                null
              : null,
          };

          queryClient.setQueryData<GetOrdersWithPresetsResponse>(
            ["orders", tableId, locale],
            {
              ...previousOrders,
              orders: [optimisticOrder, ...previousOrders.orders],
            }
          );
        }
      }

      // Return a context object with the snapshotted value
      return { previousOrders };
    },
    onErrorCallback: (_err, _newOrder, context) => {
      // If the mutation fails, roll back to the previous value
      if (context?.previousOrders) {
        queryClient.setQueryData(
          ["orders", tableId, locale],
          context.previousOrders
        );
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ["orders", tableId, locale] });
    },
  });
};

export const useUpdateOrder = (tableId: string, orderId: string) => {
  const queryClient = useQueryClient();
  const locale = useSearchParams()?.get("lang") || "en";

  return useMutationWithError<
    GetOrdersResponse,
    Error,
    PatchOrderRequest,
    { previousOrders?: GetOrdersWithPresetsResponse }
  >({
    mutationFn: (data: PatchOrderRequest) =>
      axios.put(`/tables/${tableId}/orders/${orderId}`, data),
    successMessageKey: "orderUpdated",
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({
        queryKey: ["orders", tableId, locale],
      });

      const previousOrders =
        queryClient.getQueryData<GetOrdersWithPresetsResponse>([
          "orders",
          tableId,
          locale,
        ]);

      if (previousOrders) {
        queryClient.setQueryData<GetOrdersWithPresetsResponse>(
          ["orders", tableId, locale],
          {
            ...previousOrders,
            orders: previousOrders.orders.map((order) =>
              order.id === orderId
                ? {
                    ...order,
                    quantity: updatedData.quantity ?? order.quantity,
                    taggedPersonId:
                      updatedData.taggedPersonId !== undefined
                        ? updatedData.taggedPersonId
                        : order.taggedPersonId,
                    updatedAt: new Date().toISOString(),
                  }
                : order
            ),
          }
        );
      }

      return { previousOrders };
    },
    onErrorCallback: (_err, _updatedData, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(
          ["orders", tableId, locale],
          context.previousOrders
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", tableId, locale] });
    },
  });
};

export const useDeleteOrder = (tableId: string, orderId: string) => {
  const queryClient = useQueryClient();
  const locale = useSearchParams()?.get("lang") || "en";

  return useMutationWithError<
    unknown,
    Error,
    void,
    { previousOrders?: GetOrdersWithPresetsResponse }
  >({
    mutationFn: () => axios.delete(`/tables/${tableId}/orders/${orderId}`),
    successMessageKey: "orderRemoved",
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["orders", tableId, locale],
      });

      const previousOrders =
        queryClient.getQueryData<GetOrdersWithPresetsResponse>([
          "orders",
          tableId,
          locale,
        ]);

      if (previousOrders) {
        queryClient.setQueryData<GetOrdersWithPresetsResponse>(
          ["orders", tableId, locale],
          {
            ...previousOrders,
            orders: previousOrders.orders.filter(
              (order) => order.id !== orderId
            ),
          }
        );
      }

      return { previousOrders };
    },
    onErrorCallback: (_err, _variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(
          ["orders", tableId, locale],
          context.previousOrders
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", tableId, locale] });
    },
  });
};
