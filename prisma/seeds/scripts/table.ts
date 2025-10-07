import { PrismaClient } from "@prisma/client";
import { tables } from "../data/table_data";

const prisma = new PrismaClient();

export async function seedTables() {
  let seeded = 0;

  for (const t of tables) {
    // name is now unique, so we can upsert by name
    // Use updateMany then create fallback so this works regardless of whether
    // Prisma client has been regenerated after schema change.
    const res = await prisma.table.updateMany({
      where: { name: t.name },
      data: { capacity: t.capacity },
    });
    if (res.count === 0) {
      await prisma.table.create({ data: t });
    }

    seeded += 1;
  }

  console.log(`✅ Seeded ${seeded} tables`);
}
