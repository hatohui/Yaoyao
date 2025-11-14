"use client";
import { PresetMenu, Food, FoodVariant } from "@prisma/client";
import React from "react";
import { FiPackage } from "react-icons/fi";
import Image from "next/image";

type PresetMenuItemProps = {
  presetMenu: PresetMenu & {
    food: Food;
    variant: FoodVariant | null;
  };
};

const PresetMenuItem = ({ presetMenu }: PresetMenuItemProps) => {
  const price = presetMenu.variant?.price ?? 0;
  const currency = "RM";
  const variantLabel = presetMenu.variant?.label || "";
  const totalPrice = price * presetMenu.quantity;
  const foodName = presetMenu.food.name;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-400 dark:border-yellow-600 overflow-hidden">
      <div className="p-3">
        <div className="flex gap-3">
          {/* Food Image */}
          <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700 border-2 border-yellow-300 dark:border-yellow-700">
            {presetMenu.food.imageUrl ? (
              <Image
                src={presetMenu.food.imageUrl}
                alt={foodName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiPackage className="w-6 h-6 text-slate-400 dark:text-slate-500" />
              </div>
            )}
            {/* Preset Badge */}
            <div className="absolute top-0 right-0 bg-yellow-500 dark:bg-yellow-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-bl">
              PRESET
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {foodName}
                </h3>
                {variantLabel && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {variantLabel}
                  </p>
                )}
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm">
                <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                  {totalPrice.toFixed(2)} {currency}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                  ({price.toFixed(2)} × {presetMenu.quantity})
                </span>
              </div>

              {/* Quantity Display */}
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Qty: {presetMenu.quantity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresetMenuItem;
