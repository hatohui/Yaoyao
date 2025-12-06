"use client";
import { GetOrdersResponse } from "@/types/api/order/GET";
import { useDeleteOrder, useUpdateOrder } from "@/hooks/order/useOrderMutation";
import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from "react";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiPackage,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import Image from "next/image";

type OrderItemProps = {
  order: GetOrdersResponse;
  isEditable: boolean;
  people?: { id: string; name: string }[];
};

const OrderItem = ({ order, isEditable, people = [] }: OrderItemProps) => {
  const t = useTranslations("orders");
  const [quantity, setQuantity] = useState(order.quantity);
  const [taggedPersonId, setTaggedPersonId] = useState<string | null>(
    order.taggedPersonId
  );
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tagDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateMutation = useUpdateOrder(order.tableId, order.id);
  const deleteMutation = useDeleteOrder(order.tableId, order.id);

  const usedVariant = order.variant ?? order.food.variants?.[0] ?? null;
  const price = usedVariant?.price ?? 0;
  // Currency is always RM
  const currency =
    usedVariant?.currency ?? order.food.variants?.[0]?.currency ?? "RM";
  const variantLabel = order.variant?.label || "";
  const totalPrice = price * quantity;

  // Use translated name if available, fallback to original name
  const foodName = order.food.translations?.[0]?.name || order.food.name;

  // Cleanup debounce timers on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (tagDebounceTimerRef.current) {
        clearTimeout(tagDebounceTimerRef.current);
      }
    };
  }, []);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer to update after 500ms of no changes
    debounceTimerRef.current = setTimeout(() => {
      updateMutation.mutate({ quantity: newQuantity });
    }, 500);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleTagChange = (newPersonId: string | null) => {
    setTaggedPersonId(newPersonId);

    // Clear existing timer
    if (tagDebounceTimerRef.current) {
      clearTimeout(tagDebounceTimerRef.current);
    }

    // Set new timer to update after 300ms of no changes
    tagDebounceTimerRef.current = setTimeout(() => {
      updateMutation.mutate({
        taggedPersonId: newPersonId,
      });
    }, 300);
  };

  const isAvailable =
    order.food.available && (order.variant?.available ?? true);

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg border transition-all ${
        !isAvailable
          ? "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-900/20"
          : "border-slate-200 dark:border-slate-700 hover:border-main/30 dark:hover:border-main/60 dark:hover:shadow-lg dark:hover:shadow-main/10"
      } overflow-hidden`}
    >
      <div className="p-3">
        <div className="flex gap-3">
          {/* Food Image */}
          <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700">
            {order.food.imageUrl ? (
              <Image
                src={order.food.imageUrl}
                alt={foodName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiPackage className="w-6 h-6 text-slate-400 dark:text-slate-500" />
              </div>
            )}
            {/* Not showing availability overlay per design — keep border styling */}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 flex gap-2 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {foodName}
                </h3>
                {variantLabel && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {variantLabel}
                  </p>
                )}
              </div>

              {/* Delete Button */}
              {isEditable && (
                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="flex-shrink-0 p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-50"
                  aria-label={t("removeOrder")}
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Tag Selection */}
            {isEditable && people.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                  {!taggedPersonId ? (
                    <FiUsers className="w-3 h-3" />
                  ) : (
                    <FiUser className="w-3 h-3" />
                  )}
                  <span>{t("taggedFor")}:</span>
                </div>
                <select
                  value={taggedPersonId || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleTagChange(value || null);
                  }}
                  disabled={updateMutation.isPending}
                  className="flex-1 text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-main disabled:opacity-50"
                >
                  <option value="">{t("shared")}</option>
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Display tag for non-editable view */}
            {!isEditable && (
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                {!order.taggedPersonId ? (
                  <>
                    <FiUsers className="w-3 h-3" />
                    <span>{t("sharedOrder")}</span>
                  </>
                ) : order.taggedPerson ? (
                  <>
                    <FiUser className="w-3 h-3" />
                    <span>
                      {t("taggedFor")}: {order.taggedPerson.name}
                    </span>
                  </>
                ) : null}
              </div>
            )}

            {/* Price and Quantity */}
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm">
                <span className="font-semibold text-main dark:text-main">
                  {totalPrice.toFixed(2)} {currency}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                  ({price.toFixed(2)} × {quantity})
                </span>
              </div>

              {/* Quantity Controls */}
              {isEditable ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || updateMutation.isPending}
                    className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 dark:hover:border-main disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700 dark:text-slate-300"
                  >
                    <FiMinus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-slate-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={updateMutation.isPending}
                    className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 dark:hover:border-main disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700 dark:text-slate-300"
                  >
                    <FiPlus className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {t("quantity")}: {quantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
