import { PrismaClient } from "@prisma/client";
import { seedCategories } from "./scripts/category";
import { seedFoods } from "./scripts/food";
import { seedTables } from "./scripts/table";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");
  await seedCategories();
  await seedFoods();
  await seedTables();
  console.log("✅ All seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
