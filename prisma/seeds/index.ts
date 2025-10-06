import { PrismaClient } from "@prisma/client";
import { seedCategories } from "./category";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");
  await seedCategories();
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
