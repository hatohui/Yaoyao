import { GetOrdersResponse } from "@/types/api/order/GET";
import { PresetMenu, Food, FoodVariant } from "@prisma/client";
import { DEFAULT_SET_PRICE } from "@/config/app";

export type PersonCost = {
  personId: string;
  personName: string;
  sharedCost: number;
  specificCost: number;
  totalCost: number;
};

/**
 * Calculate the cost per person for a table's orders
 * @param orders - Array of orders for the table
 * @param people - Array of people at the table
 * @param presetMenus - Array of preset menu items
 * @returns Array of PersonCost objects with cost breakdown per person
 */
export function calculatePerPersonCost(
  orders: GetOrdersResponse[],
  people: { id: string; name: string }[],
  presetMenus: (PresetMenu & { food: Food; variant: FoodVariant | null })[] = []
): PersonCost[] {
  if (!people || people.length === 0) {
    return [];
  }

  // Calculate preset menu cost per person (always shared)
  const presetMenuCostPerPerson =
    presetMenus && presetMenus.length > 0
      ? DEFAULT_SET_PRICE / people.length
      : 0;

  // Calculate total shared cost (orders without taggedPersonId)
  const sharedOrders = orders.filter((order) => !order.taggedPersonId);
  const totalSharedCost = sharedOrders.reduce((acc, order) => {
    const usedVariant = order.variant ?? order.food.variants?.[0] ?? null;
    const price = usedVariant?.price ?? 0;
    const isVariantAvailable = order.variant?.available ?? true;
    const isFoodAvailable =
      (order.food?.available ?? true) && !order.food?.isHidden;
    const isAvailable = isFoodAvailable && isVariantAvailable;

    return acc + (isAvailable ? price * order.quantity : 0);
  }, 0);

  const sharedCostPerPerson = totalSharedCost / people.length;

  // Calculate specific costs per person
  const personCosts: PersonCost[] = people.map((person) => {
    const specificOrders = orders.filter(
      (order) => order.taggedPersonId === person.id
    );

    const specificCost = specificOrders.reduce((acc, order) => {
      const usedVariant = order.variant ?? order.food.variants?.[0] ?? null;
      const price = usedVariant?.price ?? 0;
      const isVariantAvailable = order.variant?.available ?? true;
      const isFoodAvailable =
        (order.food?.available ?? true) && !order.food?.isHidden;
      const isAvailable = isFoodAvailable && isVariantAvailable;

      return acc + (isAvailable ? price * order.quantity : 0);
    }, 0);

    return {
      personId: person.id,
      personName: person.name,
      sharedCost: presetMenuCostPerPerson + sharedCostPerPerson,
      specificCost: specificCost,
      totalCost: presetMenuCostPerPerson + sharedCostPerPerson + specificCost,
    };
  });

  return personCosts;
}
