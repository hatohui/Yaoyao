import { PrismaClient } from "@prisma/client";
import { featuredData } from "../data/food/featured";
import { beverageData } from "../data/food/beverage";
import { chickenData } from "../data/food/chicken";
import { crabData } from "../data/food/crab";
import { beanCurdData } from "../data/food/curd";
import { dessertData } from "../data/food/dessert";
import { eggData } from "../data/food/egg";
import { fishData } from "../data/food/fish";
import { lalaData } from "../data/food/lala";
import { noodleData } from "../data/food/noodle";
import { porkData } from "../data/food/pork";
import { prawnData } from "../data/food/prawn";
import { riceData } from "../data/food/rice";
import { sharkFinAbaloneData } from "../data/food/sharkfinabalon";
import { soupData } from "../data/food/soup";
import { squidData } from "../data/food/squid";
import { vegetablesData } from "../data/food/vegetables";

import type { FoodData } from "../data/parsed_foods";

const prisma = new PrismaClient();

const SUPPORTED_TRANSLATIONS = ["vi", "zh", "th"]; // en is default stored on Food

const datasets: FoodData[] = [
  featuredData,
  porkData,
  chickenData,
  fishData,
  prawnData,
  squidData,
  lalaData,
  crabData,
  sharkFinAbaloneData,
  beanCurdData,
  vegetablesData,
  eggData,
  soupData,
  noodleData,
  riceData,
  dessertData,
  beverageData,
];

export async function seedFoods() {
  const counts: Record<string, number> = {};

  for (const data of datasets) {
    const categoryName = data.key;

    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });
    if (!category) {
      console.warn(`⚠️ Category not found for key: ${categoryName}, skipping`);
      continue;
    }

    let seeded = 0;

    for (const item of data.items) {
      const name = item.name;
      const description = item.description ?? null;

      const variants = (item.variants ?? []).map((v) => ({
        label: v.label ?? "",
        price: v.price ?? null,
        currency: v.currency ?? "RM",
        isSeasonal: v.isSeasonal ?? false,
      }));

      const translations = SUPPORTED_TRANSLATIONS.flatMap((lang) => {
        const t = item.translations?.[lang as string];
        if (!t) return [];
        return [
          {
            language: lang,
            name: t.name,
            description: t.description ?? null,
          },
        ];
      });

      const existing = await prisma.food.findFirst({
        where: { name, categoryId: category.id },
      });

      if (existing) {
        await prisma.$transaction([
          prisma.food.update({
            where: { id: existing.id },
            data: { name, description },
          }),
          prisma.foodVariant.deleteMany({ where: { foodId: existing.id } }),
          prisma.foodTranslation.deleteMany({ where: { foodId: existing.id } }),
        ]);

        if (variants.length > 0) {
          await prisma.foodVariant.createMany({
            data: variants.map((v) => ({ ...v, foodId: existing.id })),
          });
        }

        if (translations.length > 0) {
          await prisma.foodTranslation.createMany({
            data: translations.map((t) => ({ ...t, foodId: existing.id })),
            skipDuplicates: true,
          });
        }
      } else {
        await prisma.food.create({
          data: {
            name,
            description,
            categoryId: category.id,
            variants: variants.length > 0 ? { create: variants } : undefined,
            translations:
              translations.length > 0
                ? {
                    create: translations.map((t) => ({
                      language: t.language,
                      name: t.name,
                      description: t.description,
                    })),
                  }
                : undefined,
          },
        });
      }

      seeded += 1;
    }

    counts[categoryName] = seeded;
    console.log(`✅ Seeded ${seeded} items for category: ${categoryName}`);
  }

  console.log("\n🎯 Food seeding summary:", counts);
}
